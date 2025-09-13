export const PharmacyIcons = {
  medicine: "💊",
  vitamins: "🧬", 
  cosmetics: "✨",
  hygiene: "🧴",
  baby: "👶",
  medical: "🩺",
  fire: "🔥",
  star: "⭐",
  check: "✅",
  clock: "🕐",
  shield: "🔒",
  truck: "🚚",
  heart: "❤️",
  thumbsUp: "👍",
  gift: "🎁",
  search: "🔍",
  cart: "🛒",
  phone: "📱",
  email: "📧",
  location: "📍",
  warning: "⚠️",
  info: "ℹ️",
  money: "💰",
  prescription: "📋"
};

export const getRandomPharmacyIcon = () => {
  const icons = Object.values(PharmacyIcons);
  return icons[Math.floor(Math.random() * icons.length)];
};