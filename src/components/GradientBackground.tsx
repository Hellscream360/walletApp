import React from 'react';

const GradientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 30%),
              radial-gradient(circle at 40% 70%, rgba(96, 165, 250, 0.08) 0%, transparent 20%),
              radial-gradient(circle at 60% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 20%),
              radial-gradient(circle at 90% 60%, rgba(96, 165, 250, 0.08) 0%, transparent 30%)
            `
          }}
        />
        {/* Animated shapes */}
        <div className="fixed top-[20%] left-[20%] w-[50vw] h-[50vw] bg-blue-500/[0.06] rounded-full blur-[100px] animate-blob1"></div>
        <div className="fixed top-[40%] right-[20%] w-[45vw] h-[45vw] bg-emerald-500/[0.06] rounded-full blur-[100px] animate-blob2"></div>
        <div className="fixed bottom-[20%] left-[40%] w-[55vw] h-[55vw] bg-blue-500/[0.06] rounded-full blur-[100px] animate-blob3"></div>
      </div>
    </div>
  );
};

export default GradientBackground;
