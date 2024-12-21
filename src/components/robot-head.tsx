import React from 'react'

interface RobotPolaroidProps {
  onClick: () => void
}

export const RobotPolaroid: React.FC<RobotPolaroidProps> = ({ onClick }) => {
  return (
    <div className="group z-10 rotate-6 overflow-hidden transform translate-y-2 transition-all shadow-lg duration-300 ease-in-out hover:-translate-y-8 hover:shadow-2xl hover:scale-110 hover:rotate-3">
      <div className="w-32 h-40 bg-white p-2 shadow-md border border-stone-200 rounded-md relative">
        {/* Subtle inner shadow at the top */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-stone-100/50" />
        
        {/* Photo area with inner shadow */}
        <div className="bg-gradient-to-b from-blue-500 to-blue-600 aspect-square overflow-hidden flex items-center justify-center relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
          {/* Robot Face */}
          <div className="relative w-16 h-16">
            {/* Eyes */}
            <div className="absolute top-3 left-2 w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
            <div className="absolute top-3 right-2 w-3 h-3 bg-cyan-300 rounded-full animate-pulse delay-150"></div>
            
            {/* Antenna */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-cyan-300">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-300 rounded-full"></div>
            </div>
            
            {/* Mouth Grid */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-800 rounded-sm">
              <div className="grid grid-cols-3 gap-[2px] w-full h-full p-[1px]">
                <div className="bg-cyan-300 rounded-full"></div>
                <div className="bg-cyan-300 rounded-full"></div>
                <div className="bg-cyan-300 rounded-full"></div>
              </div>
            </div>

            {/* Circuit Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-[2px]">
                {Array(16).fill(0).map((_, i) => (
                  <div key={i} className="border-[0.5px] border-cyan-300 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
          {/* Photo area inner shadow overlay */}
          <div className="absolute inset-0 shadow-[inset_0_0_4px_rgba(0,0,0,0.1)]" />
        </div>

        {/* Bottom area with subtle gradient */}
        <div className="left-0 right-0 h-10 flex items-center justify-center bg-gradient-to-b from-transparent to-stone-50">
          <span className="text-sm text-gray-400 select-none">Ralli</span>
        </div>
      </div>
      <button
        onClick={onClick}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Select AI Robot"
      ></button>
    </div>
  )
}