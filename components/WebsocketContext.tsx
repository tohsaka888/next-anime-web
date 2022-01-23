import { createContext, MutableRefObject } from "react";

type Props = {
  wsRef?: MutableRefObject<WebSocket | undefined>;
};

const WebsocketContext = createContext<Props>({ wsRef: undefined });

export { WebsocketContext };
