import Block from "./Block";
import store from "./Store";
import isEqual from "../utils/isEqual.ts";
import type { Indexed } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructable = new (...args: any[]) => Block;
interface ComponentConstructor extends Constructable {
  componentName: string;
}

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function <T extends ComponentConstructor>(Component: T): T {
    const ConnectedComponent = class extends Component {
      private _unsubscribe?: () => void;
      private _state: Indexed;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        const state = mapStateToProps(store.getState());

        super(...args);

        this._state = state;
        this.setProps({ ...state });
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