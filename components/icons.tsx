
import React from 'react';

// IconProps interface removed

export const CopyIcon = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: className || "w-6 h-6"
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625a2.625 2.625 0 01-2.625 2.625H9.375a2.625 2.625 0 01-2.625-2.625V12A2.625 2.625 0 019.375 9.375h7.5A2.625 2.625 0 0119.5 12v2.625"
    })
  )
);

export const ClearIcon = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: className || "w-6 h-6"
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M12 9.75L14.25 12m0 0L12 14.25m2.25-2.25L14.25 9.75M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5A2.25 2.25 0 0018.75 14.25v-1.5A2.25 2.25 0 0016.5 10.5H3.75"
    })
  )
);

export const SparklesIcon = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    className: className || "w-6 h-6"
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.875 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12h.008v.008h-.008V12zm0 0c0 .002 0 .004 0 .006a3.375 3.375 0 003.369 3.369h.006c.002 0 .004 0 .006 0a3.375 3.375 0 003.37-3.37V12a3.375 3.375 0 00-3.37-3.37h-.006a3.375 3.375 0 00-3.37 3.37c0 .002 0 .004 0 .006zm2.25-1.125h.008v.008h-.008V10.875zM12 15.75h.008v.008H12v-.008z"
    })
  )
);

export const LoadingIcon = ({ className }) => (
    React.createElement('svg', {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "1.5",
      stroke: "currentColor",
      className: className || "w-6 h-6"
    },
      React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      })
    )
);