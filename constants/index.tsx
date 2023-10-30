import { CalendarCheck, Home, Store, UserCircle, Users } from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Feed",
    component: <Home />,
  },
  {
    imgURL: "/assets/friends.svg",
    route: "/friends",
    label: "Friends",
    component: <Users />,
  },
  {
    imgURL: "/assets/events.svg",
    route: "/events",
    label: "Events",
    component: <CalendarCheck />,
  },
  {
    imgURL: "/assets/shopping.svg",
    route: "/shopping",
    label: "Marketplace",
    component: <Store />,
  },

  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
    component: <UserCircle />,
  },
];
export const workspaceLinks = [
  {
    imgURL: "/assets/huawei.png",
    route: "/",
    label: "Huawei Phone Y23",
  },
  {
    imgURL: "/assets/PnG.png",
    route: "/",
    label: "Procter & Gamle AAJ",
  },
  {
    imgURL: "/assets/mcDonald.png",
    route: "/",
    label: "McDonalds's chain",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
