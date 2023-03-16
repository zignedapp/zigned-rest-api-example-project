import React from "react";

interface IZignedLogoProps {
  height?: string;
  backGroundFill?: string;
  textFill?: string;
  iconFill?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ZignedLogo({
  height = "100%",
  backGroundFill = "#3B3BF1",
  textFill = backGroundFill,
  iconFill = "#ffffff",
  className = "",
  style = {},
}: IZignedLogoProps) {
  return (
    <svg
      id="zigned_logo"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 129 44"
      preserveAspectRatio="xMidYMid"
      className={`zigned-logo ${className}`}
      style={style}
    >
      <style>{`
        .zigned-logo {
          height: ${height};
        }
        
        .zigned-logo .text {
          fill: ${textFill};
        }
        .zigned-logo .logo-badge {
          fill: ${backGroundFill};
        }
        
        .zigned-logo .icon {
          fill: ${iconFill};
        }

      `}</style>

      <g>
        <path
          className="text z"
          d="M51.6,29.5L59.9,15H52v-3h12v2.4L55.7,29h8.8v3H51.6V29.5z"
        />
        <path
          className="text i"
          d="M66.9,11.9h3.5v3.5h-3.5V11.9z M66.9,17.6h3.5V32h-3.5V17.6z"
        />
        <path
          className="text g"
          d="M81.6,31.3c-1,0.7-1.9,1-3.4,1c-3.7,0-5.3-2-5.3-6.4v-2.1c0-4.5,1.6-6.4,5.4-6.4c1.7,0,2.8,0.4,3.7,1.3l0.3-1
		H85v14c0,4.7-2.1,6.9-6.4,6.9c-2.7,0-4.3-0.8-5.4-2.7l2.6-1.5c0.7,1.1,1.4,1.5,2.7,1.5c2.1,0,3-1.1,3.1-3.9L81.6,31.3z M76.3,25.6
		c0,2.7,0.8,3.9,2.6,3.9s2.6-1.1,2.6-3.3v-2.8c0-2.2-0.8-3.3-2.6-3.3s-2.6,1.2-2.6,3.9V25.6z"
        />
        <path
          className="text n"
          d="M88.1,17.6h2.6l0.3,1.3c0.9-1.1,2-1.6,3.8-1.6c2.5,0,4.1,0.9,4.7,2.8c0.3,0.8,0.4,1.9,0.4,3.7V32h-3.5v-7.8
		c0-2.8-0.7-3.9-2.4-3.9c-1.9,0-2.6,1.1-2.6,4.3V32h-3.5V17.6z"
        />
        <path
          className="text e"
          d="M105.9,26.1c0,2.3,1.1,3.5,3.1,3.5c1.4,0,2.2-0.4,3-1.5l2.5,1.5c-1.2,1.9-2.9,2.7-5.9,2.7
		c-4.3,0-6.2-2.1-6.2-6.9v-1c0-5,1.8-7.1,6.1-7.1s6.1,2.1,6.1,7.1v1.3h-8.8V26.1z M111.4,23.3v-0.3c0-2-1-3-2.8-3
		c-1.8,0-2.8,1.1-2.8,3v0.3H111.4z"
        />
        <path
          className="text d"
          d="M125.9,31l-0.2,0.2c-1,0.8-1.9,1.1-3.7,1.1c-3.8,0-5.4-1.9-5.4-6.4v-2.1c0-4.5,1.6-6.4,5.3-6.4
		c1,0,1.7,0.1,2.5,0.5c0.2,0.1,0.2,0.1,0.5,0.3c0.1,0.1,0.1,0.1,0.3,0.1V12h3.5V32H126L125.9,31z M120,25.6c0,2.7,0.8,3.9,2.6,3.9
		s2.6-1,2.6-3.3v-2.8c0-2.2-0.8-3.3-2.6-3.3S120,21.3,120,24V25.6z"
        />
      </g>
      <g>
        <path
          className="logo-badge"
          d="M40,4v36c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h32C38.2,0,40,1.8,40,4z"
        />
      </g>
      <path
        className="icon"
        d="M13.5,26.6l8.4-14.5H14v-3h12v2.4l-8.4,14.5h8.8v3H13.5V26.6z"
      />
      <rect x="13.5" y="32.5" className="icon" width="12.9" height="3" />
    </svg>
  );
}
