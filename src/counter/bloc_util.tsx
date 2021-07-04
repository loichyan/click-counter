import { Bloc } from "@felangel/bloc";
import { BlocBuilder } from "@felangel/react-bloc";
import React from "react";

class NullContext {
  toString() {
    return "NullContext";
  }
}

export function BlocWithContext<
  E,
  S,
  B extends Bloc<E, S>,
  T extends { new (...args: any[]): B }
>(Base: T) {
  type WithContextProps = { builder(context: B): JSX.Element };
  type ProviderProps = {
    create(): B;
    children: JSX.Element;
  };
  type BuilderProps = {
    builder(state: S, context: B): JSX.Element;
  };

  abstract class ContextBloc extends Base {
    static readonly Context = React.createContext<B | NullContext>(
      new NullContext()
    );

    static readonly WithContext = class extends React.PureComponent<WithContextProps> {
      static contextType = ContextBloc.Context;
      context!: React.ContextType<typeof ContextBloc.Context>;

      render() {
        if (this.context instanceof NullContext) {
          throw Error(
            `NullContext found, you must run the Provider of ${Base.name} first`
          );
        }
        return this.props.builder(this.context);
      }
    };

    static readonly Provider = class extends React.PureComponent<ProviderProps> {
      render() {
        return (
          <ContextBloc.Context.Provider value={this.props.create()}>
            {this.props.children}
          </ContextBloc.Context.Provider>
        );
      }
    };

    static readonly Builder = class extends React.PureComponent<BuilderProps> {
      render() {
        return (
          <ContextBloc.WithContext
            builder={(context) => (
              <BlocBuilder<B, S>
                bloc={context}
                builder={(state) => this.props.builder(state, context)}
              />
            )}
          />
        );
      }
    };
  }
  return ContextBloc;
}

type Updater<S> = (state: S) => S;

export class Cubit<S> extends Bloc<Updater<S>, S> {
  async *mapEventToState(updater: Updater<S>) {
    yield updater(this.state);
  }

  emit(updater: (state: S) => S) {
    this.add(updater);
  }
}

export function CubitWithContext<
  S,
  C extends Cubit<S>,
  T extends new (...args: any[]) => C
>(Base: T) {
  return BlocWithContext<Updater<S>, S, C, T>(Base);
}
