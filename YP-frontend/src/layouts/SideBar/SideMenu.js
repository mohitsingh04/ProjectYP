export const ADMINMENU = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },

  // Pages
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Users",
        icon: "users",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/user",
            type: "link",
            title: "Users",
          },
        ],
      },
      {
        title: "Status",
        icon: "cpu",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/status",
            type: "link",
            title: "Status",
          },
          {
            path: "/dashboard/status/add",
            type: "link",
            title: "Add Status",
          },
        ],
      },
      {
        title: "Course",
        icon: "database",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/course",
            type: "link",
            title: "Course List",
          },
          {
            path: "/dashboard/course/add",
            type: "link",
            title: "Add Course",
          },
        ],
      },
      {
        title: "Category",
        icon: "database",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/category",
            type: "link",
            title: "Category List",
          },
          {
            path: "/dashboard/category/add",
            type: "link",
            title: "Add Category",
          },
        ],
      },
      {
        title: "Property",
        icon: "grid",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/property",
            type: "link",
            title: "Property List",
          },
          {
            path: "/dashboard/property/add",
            type: "link",
            title: "Add Property",
          },
        ],
      },
      {
        title: "Enquiry",
        icon: "align-justify",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/enquiry",
            type: "link",
            title: "Enquiry",
          },
        ],
      },
    ],
  },
];

export const EDITORMENU = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },

  // Pages
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Status",
        icon: "cpu",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/status",
            type: "link",
            title: "Status",
          },
          {
            path: "/dashboard/status/add",
            type: "link",
            title: "Add Status",
          },
        ],
      },
      {
        title: "Category",
        icon: "database",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/category",
            type: "link",
            title: "Category List",
          },
          {
            path: "/dashboard/category/add",
            type: "link",
            title: "Add Category",
          },
        ],
      },
      {
        title: "Property",
        icon: "grid",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/property",
            type: "link",
            title: "Property List",
          },
          {
            path: "/dashboard/property/add",
            type: "link",
            title: "Add Property",
          },
        ],
      },
    ],
  },
];

export const USERMENU = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `/dashboard`,
        icon: "home",
        type: "link",
        active: true,
        title: "Dashboard",
      },
    ],
  },

  // Pages
  {
    menutitle: "Pages",
    Items: [
      {
        title: "Property",
        icon: "grid",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/property",
            type: "link",
            title: "Property List",
          },
          {
            path: "/dashboard/property/add",
            type: "link",
            title: "Add Property",
          },
        ],
      },
      {
        title: "Enquiry",
        icon: "align-justify",
        type: "sub",
        active: false,
        children: [
          {
            path: "/dashboard/enquiry",
            type: "link",
            title: "Enquiry",
          },
        ],
      },
    ],
  },
];