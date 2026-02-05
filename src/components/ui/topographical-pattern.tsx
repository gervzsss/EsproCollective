export default function TopographicalPattern() {
  return (
    <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
      <svg className="stroke-primary absolute top-[-10%] right-[-10%] h-[120%] w-[120%] fill-none opacity-40" style={{ strokeWidth: 0.8 }} viewBox="0 0 500 500" preserveAspectRatio="none">
        <path d="M450,0 Q480,100 400,150 T450,250 T380,350 T480,500" />
        <path d="M400,0 Q430,100 350,150 T400,250 T330,350 T430,500" />
        <path d="M350,0 Q380,100 300,150 T350,250 T280,350 T380,500" />
        <path d="M500,50 Q420,150 480,250 T420,350 T500,450" />
        <path d="M500,100 Q440,200 490,300 T430,400 T500,480" />
      </svg>
    </div>
  );
}
