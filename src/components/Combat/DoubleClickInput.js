import { useState } from 'react';

export const DoubleClickInput = ({
  type,
  defaultValue,
  className,
  commitChanges,
}) => {
  const [disabled, setDisabled] = useState(true);
  const handleKeyDown = evt => {
    console.log('keyDown evt: ', evt);
    if (evt.key === 'Enter') {
      setDisabled(true);
      commitChanges(evt);
    }
  };
  const handleFocusLost = evt => setDisabled(true);
  const wrapperStyle = {
    display: 'inline-block',
    position: 'relative',
  };
  const dummyStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: disabled ? 'block' : 'none',
  };
  return (
    <div className={className} style={wrapperStyle}>
      <input
        type={type}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        onBlur={handleFocusLost}
      />
      <div
        onDoubleClick={() => setDisabled(!disabled)}
        style={dummyStyle}
      ></div>
    </div>
  );
};
