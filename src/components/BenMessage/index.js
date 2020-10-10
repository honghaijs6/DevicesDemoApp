import Message from "./class";

export default function message(options = {}) {
  const instance = new Message(options);

  return instance.open();

}
  