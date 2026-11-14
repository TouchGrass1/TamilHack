import EntranceBoard from "@/boards/EntranceBoard";
import KitchenBoard from "@/boards/KitchenBoard";
import LivingRoomBoard from "@/boards/LivingRoomBoard";
import TownHubBoard from "@/boards/TownHubBoard";
import AirportBoard from "@/boards/AirportBoard";
import RestaurantBoard from "@/boards/RestaurantBoard";
import HomePrototypeBoard from "@/boards/HomePrototypeBoard";

/** Every board from the design canvas, in tour order first. */
export const BOARDS = [
  { path: "/entrance", title: "Room 1 · வாசல் entrance (playable)", Component: EntranceBoard },
  { path: "/kitchen", title: "Room 2 · சமையலறை kitchen (playable)", Component: KitchenBoard },
  { path: "/living-room", title: "Room 3 · ஹால் living room (playable)", Component: LivingRoomBoard },
  { path: "/town", title: "A · Kolam Cozy town hub", Component: TownHubBoard },
  { path: "/airport", title: "B · Chennai Dusk airport taxi curb", Component: AirportBoard },
  { path: "/restaurant", title: "C · Palm-Leaf 4-Tone restaurant", Component: RestaurantBoard },
  { path: "/home-prototype", title: "Earlier Home scene prototype (playable)", Component: HomePrototypeBoard },
];
