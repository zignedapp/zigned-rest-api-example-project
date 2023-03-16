import { useEffect, useState } from "react";
import { Form, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { generatePDF, removeTemporaryPdf } from "~/lib/pdf-utils.server";
import { createAgreementFromGuess } from "~/lib/zigned-api.server";
import Input from "../../components/input";
import { motion, AnimatePresence } from "framer-motion";

type ActionData = {
  fields: {
    guess: string;
    email: string;
  };
  fieldErrors: {
    guess: boolean;
    email: boolean;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

// email validation

function validateEmail(email: string) {
  const matchRegexp = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/
  );
  return matchRegexp.test(email);
}

// number validation
function validateNumberInput(number: string | number) {
  const numberAsString = `${number}`;
  return (
    numberAsString.split("").filter((c) => /\d/.test(c)).length ===
    numberAsString.length
  );
}

/**
 *
 * This action function takes in a guess and email
 * generates a PDF which is uploaded to the Zigned API
 * the email will be used as a signing party for the agreement *
 *
 */

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const guess = form.get("guess");
  const email = form.get("email");

  if (typeof guess !== "string" || typeof email !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fieldErrors = {
    guess: validateNumberInput(guess) === false,
    email: validateEmail(email) === false,
  };

  const fields = { guess: parseInt(guess, 10), email };

  if (fieldErrors.guess || fieldErrors.email) {
    return badRequest({
      fieldErrors,
      fields: {
        guess,
        email,
      },
    });
  }

  // save the guess to the Database
  const saved = await db.guess.create({ data: fields });

  // Create the PDF which will be signed via the Zigned REST API
  const pdfCreated = await generatePDF({ guess: fields.guess, id: saved.id });

  if (!pdfCreated) {
    throw new Error("Oh no! Could not create the PDF");
  }

  // Create and send the agreement with the specified data
  const agreement = await createAgreementFromGuess({
    guessId: saved?.id,
    email: saved?.email,
  });

  if (!agreement?.id) {
    throw new Error("Oh no! Could not create the agreement");
  }

  // Update the guess in the database with the agreement ID

  const updated = await db.guess.update({
    where: {
      id: saved.id,
    },
    data: {
      agreementId: agreement?.id,
    },
  });

  if (!updated) {
    throw new Error(`Could not save the guess`);
  }

  // Remove the temporary PDF
  await removeTemporaryPdf(saved.id);

  return redirect(`/thank-you`);
};

export default function Guess() {
  const [allValid, setAllValid] = useState({
    email: false,
    guess: false,
  });

  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const isSubmitting = transition.state === "submitting";

  return (
    <Form method="post" className="form-wrapper">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            transition: {
              type: "spring",
              staggerChildren: 0.1,
            },
          },
          animate: {
            opacity: 1,
            transition: {
              type: "spring",
              staggerChildren: 0.1,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: 0.1,
              type: "spring",
              when: "afterChildren",
            },
          },
        }}
        style={{ width: "100%" }}
        className="flex flex-column"
      >
        <GuessInput
          isValid={(e) => setAllValid({ ...allValid, guess: e })}
          disabled={isSubmitting}
          defaultValue={actionData?.fields?.guess}
          error={actionData?.fieldErrors?.guess}
          key={"guess-input"}
        />
        <EmailInput
          isValid={(e) => setAllValid({ ...allValid, email: e })}
          disabled={isSubmitting}
          defaultValue={actionData?.fields?.email}
          error={actionData?.fieldErrors?.email}
          key={"email-input"}
        />

        <motion.div
          className="submit-button-wrapper"
          key={"submit-button-wrapper"}
          transition={{
            duration: 1,
            type: "spring",
          }}
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
          }}
        >
          <button
            disabled={
              isSubmitting ||
              allValid.email === false ||
              allValid.guess === false
            }
            type="submit"
            className="button"
            style={{ display: "block", width: "100%" }}
          >
            <AnimatePresence>
              <motion.div className="flex align-items-center justify-content-center">
                {isSubmitting ? (
                  <motion.span
                    key="submitting"
                    transition={{
                      duration: 0.3,
                      type: "spring",
                    }}
                    variants={{
                      initial: { opacity: 0, y: 50 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -50 },
                    }}
                  >
                    Förbereder dokument...
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: 0.3,
                      type: "spring",
                    }}
                    variants={{
                      initial: { opacity: 0, y: 50 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -50 },
                    }}
                  >
                    Signera gissning
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>
    </Form>
  );
}

interface IGuessFormInputProps {
  error?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  isValid: (val: boolean) => void;
}

function GuessInput({
  error,
  defaultValue = "",
  disabled,
  isValid,
}: IGuessFormInputProps) {
  const [guess, setGuess] = useState(defaultValue);

  return (
    <motion.div
      transition={{
        duration: 1,
        type: "spring",
      }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      }}
      className="flex flex-column justify-content-center input-wrapper"
    >
      <label className={disabled ? "disabled" : ""}>
        Hur många bollar tror du finns i kupolen?
      </label>
      <Input
        disabled={disabled}
        placeholder="Ange din gissning"
        success={true}
        errorMsg={error ? "Du måste ange ett heltal" : ""}
        value={guess}
        type="tel"
        name="guess"
        onChange={(e) => {
          const numbersOnly = e.target.value
            .split("")
            .filter((c) => /\d/.test(c))
            .join("");
          setGuess(numbersOnly);
          isValid(numbersOnly.length > 0);
        }}
      />
    </motion.div>
  );
}

function EmailInput({
  error,
  defaultValue = "",
  disabled,
  isValid,
}: IGuessFormInputProps) {
  const [email, setEmail] = useState(defaultValue);

  useEffect(() => {
    if (email.length > 0) {
      isValid(validateEmail(email));
    }
  }, [email]);

  const success = () => {
    return validateEmail(email);
  };

  return (
    <motion.div
      transition={{
        duration: 1,
        type: "spring",
      }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      }}
      className="flex flex-column justify-content-center input-wrapper"
    >
      <label className={disabled ? "disabled" : ""}>
        Ange din e-postadress
      </label>
      <Input
        disabled={disabled}
        placeholder="Din e-post behövs för att signera din gissning"
        success={success()}
        errorMsg={error ? "Du måste ange en giltig e-postadress" : ""}
        value={email}
        type="email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </motion.div>
  );
}
