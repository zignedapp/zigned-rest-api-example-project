interface IZignedIconProps {
  height?: string;
  backgroundFill?: string;
  iconFill?: string;
  className?: string;
  style?: Object;
}

export default function ZignedIcon({
  height = "auto",
  backgroundFill = "#3B3BF1",
  iconFill = "#ffffff",
  className = "",
  style = {},
}: IZignedIconProps) {
  return (
    <svg
      id="zigned_icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 40 44"
      xmlSpace="preserve"
      style={style}
      className={className}
    >
      <path
        className="badge-fill"
        d="M40,4v36c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h32C38.2,0,40,1.8,40,4z"
      />
      <path
        className="icon-fill"
        d="M13.5,26.6l8.4-14.5H14v-3h12v2.4l-8.4,14.5h8.8v3H13.5V26.6z"
      />
      <rect x="13.5" y="32.5" className="icon-fill" width="12.9" height="3" />
      <style>
        {`
          #zigned_icon svg {
            height: 100%;
            max-height: ${height};
          }
          #zigned_icon .badge-fill {
            fill: ${backgroundFill};
          }
          #zigned_icon .icon-fill {
            fill: ${iconFill};
          }
        `}
      </style>
    </svg>
  );
}
