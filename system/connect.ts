import Block from "./Block";
import store from "./Store";
import isEqual from "../utils/isEqual.ts";
import type { Indexed } from "../utils/types";

type Constructable = new (...args: never[]) => Block;
interface ComponentConstructor extends Constructable {
  componentName: string;
}

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function <T extends ComponentConstructor>(Component: T): T {
    const ConnectedComponent = class extends Component {
      private _unsubscribe?: () => void;
      private _state: Indexed;

      constructor(...args: never[]) {
        const props = (args[0] as Record<string, unknown>) ?? {};
        const state = mapStateToProps(store.getState());

        super({ ...props, ...state } as never);

        this._state = state;
      }

      componentDidMount() {
        this._unsubscribe = store.subscribe(() => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(this._state, newState)) {
            this.setProps({ ...newState });
          }

          this._state = newState;
        });

        super.componentDidMount?.();
      }

      componentWillUnmount() {
        this._unsubscribe?.();
        super.componentWillUnmount?.();
      }
    };

    ConnectedComponent.componentName = Component.componentName;

    return ConnectedComponent as T;
  };
}
