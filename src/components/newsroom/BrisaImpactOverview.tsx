import React from "react";
import { Users, Clock, TrendingUp, Target } from "lucide-react";

const BrisaImpactOverview = () => {
  // SDG colors from the provided HTML
  const sdgColors: Record<number, string> = {
    3: "rgb(76, 159, 56)",
    4: "rgb(197, 25, 45)",
    5: "rgb(255, 58, 33)",
    6: "rgb(38, 189, 226)",
    7: "rgb(252, 195, 11)",
    8: "rgb(162, 25, 66)",
    9: "rgb(253, 105, 37)",
    11: "rgb(253, 157, 36)",
    13: "rgb(63, 126, 68)",
    15: "rgb(86, 192, 43)",
    17: "rgb(25, 72, 106)",
  };

  const sdgNumbers = [3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17];

  return (
    <div className="bg-gradient-to-r from-coompass-success/10 to-blue-500/10 dark:from-coompass-success/20 dark:to-blue-500/20 rounded-xl p-6 border border-coompass-success/20">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">Grupo Brisa Impact Overview</h2>
        <p className="text-sm text-muted-foreground">
          Creating sustainable value through collective action and commitment
        </p>
      </div>

      {/* Compact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Collaborators */}
        <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-white/50 dark:bg-black/30 backdrop-blur-sm border-white/20 hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-coompass-success/20 rounded-full">
                <Users className="h-5 w-5 text-coompass-success" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground mb-0.5">0</div>
            <div className="text-xs font-medium text-foreground mb-0.5">Total Collaborators</div>
            <div className="text-xs text-muted-foreground">Active employees</div>
          </div>
        </div>

        {/* Volunteer Hours */}
        <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-white/50 dark:bg-black/30 backdrop-blur-sm border-white/20 hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-coompass-success/20 rounded-full">
                <Clock className="h-5 w-5 text-coompass-success" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground mb-0.5">0</div>
            <div className="text-xs font-medium text-foreground mb-0.5">Volunteer Hours</div>
            <div className="text-xs text-muted-foreground">Hours contributed</div>
          </div>
        </div>

        {/* Participation Rate */}
        <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-white/50 dark:bg-black/30 backdrop-blur-sm border-white/20 hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-coompass-success/20 rounded-full">
                <TrendingUp className="h-5 w-5 text-coompass-success" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground mb-0.5">0%</div>
            <div className="text-xs font-medium text-foreground mb-0.5">Participation Rate</div>
            <div className="text-xs text-muted-foreground">Employee engagement</div>
          </div>
        </div>

        {/* Active Initiatives */}
        <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-white/50 dark:bg-black/30 backdrop-blur-sm border-white/20 hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-coompass-success/20 rounded-full">
                <Target className="h-5 w-5 text-coompass-success" />
              </div>
            </div>
            <div className="text-xl font-bold text-foreground mb-0.5">0</div>
            <div className="text-xs font-medium text-foreground mb-0.5">Active Initiatives</div>
            <div className="text-xs text-muted-foreground">Ongoing projects</div>
          </div>
        </div>
      </div>

      {/* Compact SDG Commitment Section */}
      <div className="text-center pt-4 border-t border-coompass-success/20">
        <h3 className="text-lg font-semibold mb-2">Our SDG Commitment</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Contributing to 11 of the UN Sustainable Development Goals
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {sdgNumbers.map((sdg) => (
            <div
              key={sdg}
              className="rounded-full flex items-center justify-center text-white font-bold h-8 w-8 text-sm hover:scale-110 transition-transform cursor-default"
              style={{ backgroundColor: sdgColors[sdg] }}
              title={`SDG ${sdg}`}
            >
              {sdg}
            </div>
          ))}
        </div>
        <a
          href="https://grupobrisa.pt/sustentabilidade/compromisso/objetivos-de-desenvolvimento-sustentavel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-coompass-success hover:underline inline-flex items-center gap-1"
        >
          Learn more about our sustainability commitment
          <span>→</span>
        </a>
      </div>
    </div>
  );
};

export default BrisaImpactOverview;

