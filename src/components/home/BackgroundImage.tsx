
export function BackgroundImage() {
  return (
    <div 
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ 
        background: 'linear-gradient(to bottom, #f1f1f1, #e1e1e1)',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        backgroundBlendMode: 'overlay'
      }}
    />
  );
}
