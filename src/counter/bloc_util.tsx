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
  abstract class ContextBloc extends Base {
    static readonly ContextType = React.createContext<B | NullContext>(
      new NullContext()
    );

    // TODO: PureComponet?
    static readonly WithContext = function WithContext(props: {
      builder(context: B): JSX.Element;
    }) {
      const context = React.useContext(ContextBloc.ContextType);
      if (context instanceof NullContext) {
        throw Error(
          `NullContext found, you must run the Provider of ${Base.name} first`
        );
      }
      return props.builder(context);
    };

    static readonly Provider = function Provider(props: {
      create(): B;
      children: JSX.Element;
    }) {
      return (
        <ContextBloc.ContextType.Provider value={props.create()}>
          {props.children}
        </ContextBloc.ContextType.Provider>
      );
    };

    static readonly Builder = function Builder(props: {
      builder(state: S, context: B): JSX.Element;
    }) {
      return (
        <ContextBloc.WithContext
          builder={(context) => (
            <BlocBuilder<B, S>
              bloc={context}
              builder={(state) => props.builder(state, context)}
            />
          )}
        />
      );
    };
  }
  return ContextBloc;
}

export class Cubit<S> extends Bloc<S, S> {
  async *mapEventToState(state: S) {
    yield state;
  }

  emit(state: S) {
    this.add(state);
  }
}

export function CubitWithContext<
  S,
  C extends Cubit<S>,
  T extends new (...args: any[]) => C
>(Base: T) {
  return BlocWithContext<S, S, C, T>(Base);
}
