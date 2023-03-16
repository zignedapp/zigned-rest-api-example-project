import { Guess } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAgreements } from "~/lib/zigned-api.server";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const getAgreementsResponse = await getAgreements();

  const guesses = await db.guess.findMany({
    where: {
      createdAt: { gte: new Date() },
    },
  });

  return json({ agreements: getAgreementsResponse?.agreements || [], guesses });
};

export default function FindWinner() {
  const winners = useLoaderData<{ agreements: any; guesses: Guess[] }>();

  const correctAnswer = 150;

  const findAgreementByGuess = ({
    agreementId,
  }: {
    agreementId: string | null;
  }) => {
    if (!Boolean(agreementId)) {
      return;
    }

    const agreement = winners?.agreements?.find(
      (agreement: any) => agreement?.id === agreementId
    );

    return agreement;
  };

  return (
    <ul>
      {winners?.guesses
        ?.sort(
          (a, b) =>
            Math.abs(correctAnswer - a?.guess) -
            Math.abs(correctAnswer - b?.guess)
        )
        .map((guess) => {
          const agreement = findAgreementByGuess({
            agreementId: guess?.agreementId,
          });

          if (!agreement || agreement?.status !== "fulfilled") {
            return null;
          }

          return (
            <li>
              {guess.email}, {guess.guess}, hasSigned? {agreement?.status}
            </li>
          );
        })}
    </ul>
  );
}
