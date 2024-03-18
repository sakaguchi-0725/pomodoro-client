import React from 'react'

type ToggleSwitchProps = {
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, setIsChecked }) => {
  const toggleBackgroundStyle = {
    backgroundColor: isChecked ? 'rgb(79 70 229)' : '#a1a1a1',
    width: '56px',
    height: '32px',
    borderRadius: '9999px',
  }

  const toggleDotStyle = {
    transform: isChecked ? 'translateX(24px)' : 'translateX(0px)',
    transition: 'transform 0.2s ease',
    width: '24px',
    height: '24px',
    borderRadius: '9999px',
    backgroundColor: '#ffffff',
    position: 'absolute' as 'absolute',
    top: '4px',
    left: '4px',
  }

  return (
    <div className="flex items-center justify-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div style={toggleBackgroundStyle}></div>
          <div style={toggleDotStyle}></div>
        </div>
      </label>
    </div>
  )
}
