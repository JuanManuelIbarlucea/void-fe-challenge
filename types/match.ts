export type MatchData = {
  is_available: boolean;
  metadata: {
    map: string;
    game_version: string;
    game_length: number;
    game_start: number;
    game_start_patched: string;
    rounds_played: 30;
    mode: string;
    mode_id: string;
    queue: string;
    season_id: string;
    platform: string;
    matchid: string;
    premier_info: {
      tournament_id: string | null;
      matchup_id: string | null;
    };
    region: string;
    cluster: string;
  };
  players: {
    all_players: MatchPlayer[];
    red: MatchPlayer[];
    blue: MatchPlayer[];
  };
  observers: [];
  coaches: [];
  teams: {
    red: MatchTeam;
    blue: MatchTeam;
  };
  rounds: MatchRound[];
  kills: MatchKills[];
};

type MatchKills = {
  kill_time_in_round: number;
  kill_time_in_match: number;
  round: number;
  killer_puuid: string;
  killer_display_name: string;
  killer_team: string;
  victim_puuid: string;
  victim_display_name: string;
  victim_team: string;
  victim_death_location: Location;
  damage_weapon_id: string;
  damage_weapon_name: string;
  damage_weapon_assets: WeaponAsset;
  secondary_fire_mode: boolean;
  player_locations_on_kill: PlayerLocationOnEvent[];
  assistants: Assistant[];
};

type Location = {
  x: number;
  y: number;
};

type PlayerLocationOnEvent = {
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  location: Location;
  view_radians: number;
};

type BombPlayer = {
  puuid: string;
  display_name: string;
  team: string;
};

type DamageEvent = {
  receiver_puuid: string;
  receiver_display_name: string;
  receiver_team: string;
  bodyshots: number;
  damage: number;
  headshots: number;
  legshots: number;
};

type WeaponAsset = {
  display_icon: string;
  killfeed_icon: string;
};
type Assistant = {
  assistant_puuid: string;
  assistant_display_name: string;
  assistant_team: string;
};
type KillEvent = {
  kill_time_in_round: number;
  kill_time_in_match: number;
  killer_puuid: string;
  killer_display_name: string;
  killer_team: string;
  victim_puuid: string;
  victim_display_name: string;
  victim_team: string;
  victim_death_location: Location;
  damage_weapon_id: string;
  damage_weapon_name: string;
  damage_weapon_assets: WeaponAsset;
  secondary_fire_mode: true;
  player_locations_on_kill: PlayerLocationOnEvent[];
  assistants: Assistant[];
};

type PlayerStats = {
  ability_casts: {
    c_casts: number | null;
    q_casts: number | null;
    e_cast: number | null;
    x_cast: number | null;
  };
  player_puuid: string;
  player_display_name: string;
  player_team: string;
  damage_events: DamageEvent[];
  damage: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
  kill_events: KillEvent[];
  kills: number;
  score: number;
  economy: {
    loadout_value: number;
    weapon: {
      id: string;
      name: string;
      assets: WeaponAsset;
    };
    armor: {
      id: string | null;
      name: string | null;
      assets: {
        display_icon: string | null;
      };
    };
    remaining: number;
    spent: number;
  };
  was_afk: false;
  was_penalized: false;
  stayed_in_spawn: false;
};

type MatchRound = {
  winning_team: string;
  end_type: string;
  bomb_planted: boolean;
  bomb_defused: boolean;
  plant_events: {
    plant_location: Location | null;
    planted_by: BombPlayer | null;
    plant_site: string | null;
    plant_time_in_round: number | null;
    player_locations_on_plant: PlayerLocationOnEvent[] | null;
  };
  defuse_events: {
    defuse_location: Location | null;
    defused_by: BombPlayer | null;
    defuse_time_in_round: number | null;
    player_locations_on_defuse: PlayerLocationOnEvent[];
  };
  player_stats: PlayerStats[];
};

type MatchTeam = {
  has_won: boolean;
  rounds_won: number;
  rounds_lost: number;
  roster: any | null;
};

export type MatchPlayer = {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  behavior: {
    afk_rounds: number;
    friendly_fire: {
      incoming: number;
      outgoing: number;
    };
    rounds_in_spawn: number;
  };
  platform: {
    type: string;
    os: {
      name: string;
      version: string;
    };
  };
  ability_casts: {
    c_cast: number;
    q_cast: number;
    e_cast: number;
    x_cast: number;
  };
  assets: {
    card: {
      small: string;
      large: string;
      wide: string;
    };
    agent: {
      small: string;
      bust: string;
      full: string;
      killfeed: string;
    };
  };
  stats: {
    score: number;
    kills: number;
    deaths: number;
    assists: number;
    bodyshots: number;
    headshots: number;
    legshots: number;
  };
  economy: {
    spent: {
      overall: number;
      average: number;
    };
    loadout_value: {
      overall: number;
      average: number;
    };
  };
  damage_made: number;
  damage_received: number;
};
