import Wave from 'react-wavify';

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="h-full w-full bg-transparent" />
      <div className="absolute top-0 w-full">
        <Wave
          fill="#1a2331"
          paused={false}
          style={{ display: 'flex' }}
          options={{
            height: 80,
            amplitude: 20,
            speed: 0.15,
            points: 3,
            intensity: 0.25
          }}
        />
      </div>
    </div>
  );
};

export default WaveBackground;
