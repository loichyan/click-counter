import { Bloc } from "@felangel/bloc";
import { BlocBuilder } from "@felangel/react-bloc";
import React from "react";

type Constructor<T> = new (...args: any[]) => T;

class NullContext {
  toString() {
    return "NullContext";
  }
}

export function makeBlocContext<E, S, B extends Bloc<E, S>>(
  Target: Constructor<B>
) {
  type WithContextProps = { builder(context: B): JSX.Element };
  type ProviderProps = {
    create(): B;
    children: JSX.Element;
  };
  type BuilderProps = {
    builder(state: S, context: B): JSX.Element;
  };

  class Context {
    private static readonly _contextType = React.createContext<B | NullContext>(
      new NullContext()
    );

    static get contextType() {
      return Context._contextType as React.Context<B>;
    }

    static readonly WithContext = class WithContext extends React.PureComponent<WithContextProps> {
      static contextType = Context._contextType;
      context!: React.ContextType<typeof Context._contextType>;

      render() {
        if (this.context instanceof NullContext) {
          throw Error(
            `NullContext found, you must run the Provider of ${Target.name} first`
          );
        }
        return this.props.builder(this.context);
      }
    };

    static readonly Provider = class Provider extends React.PureComponent<ProviderProps> {
      render() {
        return (
          // eslint-disable-next-line react/jsx-pascal-case
          <Context._contextType.Provider value={this.props.create()}>
            {this.props.children}
          </Context._contextType.Provider>
        );
      }
    };

    static readonly Builder = class Builder extends React.PureComponent<BuilderProps> {
      render() {
        return (
          <Context.WithContext
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

  return Context;
}

export function wrapBlocWithContext<E, S, B extends Bloc<E, S>>(
  Base: Constructor<B>
) {
  const contextBloc = makeBlocContext<E, S, B>(Base);

  abstract class ContextBloc extends Base {
    static readonly contextType = contextBloc.contextType;
    static readonly WithContext = contextBloc.WithContext;
    static readonly Provider = contextBloc.Provider;
    static readonly Builder = contextBloc.Builder;
  }
  return ContextBloc;
}

type Updater<S> = (state: S) => S;

export class Cubit<S> extends Bloc<Updater<S>, S> {
  async *mapEventToState(updater: Updater<S>) {
    yield updater(this.state);
  }

  emit(state: Updater<S>) {
    this.add(state);
  }
}

export function makeCubitContext<S, C extends Cubit<S>>(Base: Constructor<C>) {
  return makeBlocContext<Updater<S>, S, C>(Base);
}

export function wrapCubitWithContext<S, C extends Cubit<S>>(
  Base: Constructor<C>
) {
  return wrapBlocWithContext<Updater<S>, S, C>(Base);
}
