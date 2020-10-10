import Confirm from "./Confirm.class";

export default function confirm(options = {}) {
  const instance = new Confirm(options);

  return instance.open();
}
