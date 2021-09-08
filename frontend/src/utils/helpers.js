import * as moment from "moment";

export const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length - 3) + "..." : str;
};

export const transformDate = (date) => {
  return moment(date).format("MMMM Do YYYY");
};

export const uppercaseFirstLetter = (str) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};
export function generateHashtagFromString(myString) {
  let newString = "";
  if (myString) {
    newString = myString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>]/gi, "");
    let splitString = newString.split(" ");
    newString = splitString.map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1, string.length);
    });

    return "#" + newString.join("");
  } else {
    return "";
  }
}

// export function validateEmail(email) {
//   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//   if (reg.test(email) == false) {
//     return false;
//   }

//   return true;
// }

export function generateRandomColor() {
  var hex = Math.floor(Math.random() * 0xffffff);
  document.getElementById("result");
  var result = "#" + hex.toString(16);
  return result;
}

export function getCurrentDate() {
  return Math.floor(Date.now() / 1000);
}

export function getEventStatus(event) {
  let startDate = Date.parse(event.event_start) / 1000;
  let endDate = event.event_end
    ? Date.parse(event.event_end) / 1000
    : startDate + 432000;
  let now = getCurrentDate();

  let defaults = {
    value: "finished",
    display_name: "Finished",
    palette: {
      color: "primary",
      iconBackground: "primary",
      miniatureColor: "black",
      iconColor: "white",
    },
  };

  let status = defaults;

  if (now > endDate) {
    status = defaults;
  } else if (now > startDate && now <= endDate) {
    status = {
      value: "ongoing",
      display_name: "Ongoing",
      palette: {
        color: "secondary",
        iconBackground: "White",
        miniatureColor: "secondary",
        iconColor: "black",
      },
    };
  } else if (now <= startDate) {
    status = {
      value: "upcoming",
      display_name: "Upcoming",
      palette: {
        color: "primary",
        iconBackground: "White",
        miniatureColor: "primary",
        iconColor: "black",
      },
    };
  }
  return status;
}

export function getEventColorScheme(status, theme) {
  let colorScheme = theme.palette.grey[800];
  // console.log(theme.palette["warning"], "sajdl;sajk;");
  if (theme.palette && status.palette) {
    colorScheme =
      status.palette.color === "black"
        ? "#1a1a1a"
        : theme.palette.type === "dark"
        ? theme.palette[status.palette.color].dark
        : theme.palette[status.palette.color].main;
  }

  return colorScheme;
}

export function getMiniatureColor(status, theme) {
  let miniatureColor = theme.palette.grey[800];
  if (theme.palette && status.palette) {
    miniatureColor =
      status.palette.miniatureColor === "black"
        ? "#1a1a1a"
        : theme.palette.type === "dark"
        ? theme.palette[status.palette.miniatureColor].dark
        : theme.palette[status.palette.miniatureColor].main;
  }

  return miniatureColor;
}
