
import React, { useRef, useState } from "react";
import { missions } from "@/data/missions"; // This import stays the same
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

const MissionTicker: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [animationPlayState, setAnimationPlayState] = useState<'running' | 'paused'>('running');
  
  // Filter only active missions
  const activeMissions = missions.filter(mission => mission.isActive);

  const handleMouseEnter = () => {
    setIsPaused(true);
    setAnimationPlayState('paused');
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setAnimationPlayState('running');
  };

  // Create a mission card that can be reused for both the original and duplicate lists
  const renderMissionCard = (mission: typeof missions[0], isDuplicate = false) => (
    <Link to={`/missions/${mission.id}`} key={isDuplicate ? `dup-${mission.id}` : mission.id}>
      <Card className="w-80 shrink-0 p-4 border shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-coompass-success/20 hover:text-coompass-success">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold line-clamp-1 w-full">{mission.title}</h4>
          <div className="text-xs text-muted-foreground">
            <span>by <span className="text-[#0FA0CE]">{mission.organization}</span></span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">
              {mission.hours} hours
            </span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-500 rounded-full">
              {mission.volunteers} volunteers
            </span>
            <span className={`px-2 py-1 rounded-full ${mission.location === "In-Person" ? "bg-purple-500/20 text-[#7E69AB]" : "bg-indigo-500/20 text-[#9b87f5]"}`}>
              {mission.location}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="w-full mb-8 overflow-hidden bg-muted/40 rounded-lg relative">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="text-lg font-medium">Active Missions</h3>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          {isPaused ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPaused ? "Paused" : "Live updates"}
        </span>
      </div>

      <div
        className="py-3 px-4 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 w-max"
          style={{
            animation: `scroll 60s linear infinite ${animationPlayState}`,
          }}
        >
          {activeMissions.map((mission) => renderMissionCard(mission))}
          
          {/* Duplicate missions for seamless looping */}
          {activeMissions.map((mission) => renderMissionCard(mission, true))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MissionTicker;
