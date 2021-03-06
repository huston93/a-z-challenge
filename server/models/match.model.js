/*jshint esversion: 6 */
const mongoose = require('mongoose'),

wardLogSchema = new mongoose.Schema({
  time: Number,
  log_type: String,
  key: String,
  slot: Number,
  x: Number,
  y: Number,
  z: Number,
  entityleft: Boolean,
  ehandle: Number,
  player_slot: Number
}),

matchPlayerSchema = new mongoose.Schema({
  match_id: Number,
  player_slot: Number,
  ability_targets: {},
  ability_upgrades_arr: [Number],
  ability_uses: {},
  account_id: Number,
  actions: {},
  additional_units: {},
  assists: Number,
  backpack_0: Number,
  backpack_1: Number,
  backpack_2: Number,
  buyback_log: [
    {
      time: Number,
      slot: Number,
      log_type: String,
      player_slot: Number
    }
  ],
  camps_stacked: Number,
  creeps_stacked: Number,
  damage: {},
  damage_inflictor: {},
  damage_inflictor_received: {},
  damage_taken: {},
  damage_targets: {},
  deaths: Number,
  denies: Number,
  dn_t: [Number],
  firstblood_claimed: Number,
  gold: Number,
  gold_per_min: Number,
  gold_reasons: {},
  gold_spent: Number,
  gold_t: [Number],
  hero_damage: Number,
  hero_healing: Number,
  hero_hits: {},
  hero_id: Number,
  item_0: Number,
  item_1: Number,
  item_2: Number,
  item_3: Number,
  item_4: Number,
  item_5: Number,
  item_uses: {},
  kill_streaks: {},
  killed: {},
  killed_by: {},
  kills: Number,
  kills_log: [
    {
      time: Number,
      key: String
    }
  ],
  lane_pos: {},
  last_hits: Number,
  leaver_status: Number,
  level: Number,
  lh_t: [Number],
  life_state: {},
  max_hero_hit: 
    {
      max_hit_type: String,
      time: Number,
      max: Boolean,
      inflictor: String,
      unit: String,
      key: String,
      value: Number,
      slot: Number,
      player_slot: Number
    },
  multi_kills: {},
  obs: {},
  obs_left_log: [wardLogSchema],
  obs_log: [wardLogSchema],
  obs_placed: Number,
  party_id: Number,
  party_size: Number,
  performance_others: {},
  permanent_buffs: [{}],
  pings: Number,
  pred_vict: Boolean,
  purchase: {},
  purchase_log: [
    {
      time: Number,
      key: String
    }
  ],
  randomed: Boolean,
  repicked: {},
  roshans_killed: Number,
  rune_pickups: Number,
  runes: {},
  runes_log: [
    {
      time: Number,
      key: Number
    }
  ],
  sen: {},
  sen_left_log: [wardLogSchema],
  sen_log: [wardLogSchema],
  sen_placed: Number,
  stuns: Number,
  teamfight_participation: Number,
  times: [Number],
  tower_damage: Number,
  towers_killed: Number,
  xp_per_min: Number,
  xp_reasons: {},
  xp_t: [Number],
  personaname: String,
  name: String,
  last_login: Date,
  radiant_win: Boolean,
  start_time: Number,
  duration: Number,
  cluster: Number,
  lobby_type: Number,
  game_mode: Number,
  patch: Number,
  region: Number,
  isRadiant: Boolean,
  win: Number,
  lose: Number,
  total_gold: Number,
  total_xp: Number,
  kills_per_min: Number,
  kda: Number,
  abandons: Number,
  neutral_kills: Number,
  tower_kills: Number,
  courier_kills: Number,
  lane_kills: Number,
  hero_kills: Number,
  observer_kills: Number,
  sentry_kills: Number,
  roshan_kills: Number,
  necronomicon_kills: Number,
  ancient_kills: Number,
  buyback_count: Number,
  observer_uses: Number,
  sentry_uses: Number,
  lane_efficiency: Number,
  lane_efficiency_pct: Number,
  lane: Number,
  lane_role: Number,
  is_roaming: Boolean,
  purchase_time: {},
  first_purchase_time: {},
  item_win: {},
  item_usage: {},
  purchase_tpscroll: Number,
  actions_per_min: Number,
  life_state_dead: Number,
  rank_tier: Number,
  cosmetics: [
    {
      item_id: Number,
      name: String,
      prefab: String,
      creation_date: String,
      image_inventory: String,
      image_path: String,
      item_description: String,
      item_name: String,
      item_rarity: String,
      item_type_name: String,
      used_by_heroes: String
    }
  ],
  benchmarks: {},
}),

matchSchema = new mongoose.Schema({
  match_id: Number,
  barracks_status_dire: Number,
  barracks_status_radiant: Number,
  chat: [
    {
      time: Number,
      chat_type: String,
      unit: String,
      key: String,
      slot: Number,
      player_slot: Number
    }
  ], 
  cluster: Number,
  cosmetics: {},
  dire_score: Number,
  draft_timings: [
    {
      order: Number,
      pick: Boolean,
      active_team: Number,
      hero_id: Number,
      player_slot: Number,
      extra_time: Number,
      total_time_taken: Number
    }
  ],
  duration: Number,
  engine: Number,
  first_blood_time: Number,
  game_mode: Number,
  human_players: Number,
  leagueid: Number,
  lobby_type: Number,
  match_seq_num: Number,
  negative_votes: Number,
  objectives: [
    {
      time: Number,
      objective_type: String,
      unit: String,
      slot: Number,
      key: String,
      player_slot: Number
    }
  ],
  picks_bans: [
    {
      is_pick: Boolean,
      hero_id: Number,
      team: Number,
      order: Number
    }
  ],
  positive_votes: Number,
  radiant_gold_adv: {},
  radiant_score: Number,
  radiant_team_id: Number,
  radiant_win: Boolean,
  radiant_xp_adv: {},
  skill: Number,
  start_time: Number,
  teamfights: [
    {
      start: Number,
      end: Number,
      last_death: Number,
      deaths: Number,
      players: [
        {
          deaths_pos: {},
          ability_uses: {},
          ability_targets: {},
          item_uses: {},
          killed: {},
          deaths: Number,
          buybacks: Number,
          damage: Number,
          healing: Number,
          gold_delta: Number,
          xp_detla: Number,
          xp_start: Number,
          xp_end: Number
        }
      ]
    }
  ],
  tower_status_dire: Number,
  tower_status_radiant: Number,
  version: Number,
  players: [matchPlayerSchema],
  patch: Number,
  region: Number,
  all_word_counts: {},
  my_word_counts: {},
  throw: Number,
  loss: Number,
  replay_url: String
}),

Match = mongoose.model('Match',matchSchema);

module.exports = Match;