import Immutable from "immutable";

import { Cubit, CubitWithContext } from "./bloc_util";

export class CounterViewBlocInner extends Cubit<CounterViewState> {
  constructor() {
    super(new CounterViewState());
  }

  readonly addCounter = () => {
    this.emit(
      new CounterViewState(
        this.state.counters.push(
          new CounterBlocInner(`Counter #${this.state.counters.size}`)
        )
      )
    );
  };

  readonly removeCounter = (idx: number) => {
    this.emit(new CounterViewState(this.state.counters.remove(idx)));
  };

  readonly clearCounter = () => {
    this.emit(new CounterViewState(this.state.counters.clear()));
  };
}

export class CounterViewState {
  counters: Immutable.List<CounterBlocInner | null>;

  constructor(counters?: Immutable.List<CounterBlocInner | null>) {
    this.counters = counters || Immutable.List();
  }
}

export class CounterBlocInner extends Cubit<CounterState> {
  constructor(title: String, records?: Records) {
    super(new CounterState(title, records));
  }
}

export class CounterState {
  records: RecordsBlocInner;
  title: TitleBlocInner;

  constructor(title: String, records?: Records) {
    this.title = new TitleBlocInner(title);
    this.records = new RecordsBlocInner(records);
  }
}

export type Records = Immutable.List<Date>;

export class RecordsBlocInner extends Cubit<Records> {
  constructor(records?: Records) {
    super(records || Immutable.List());
  }

  readonly pushRecord = (time?: Date) => {
    this.emit(this.state.push(time || new Date()));
  };

  readonly popRecord = () => {
    this.emit(this.state.pop());
  };
}

export class TitleBlocInner extends Cubit<String> {
  readonly setTitle = (title: String) => {
    this.emit(title || this.state);
  };
}

export const CounterViewBloc = CubitWithContext<
  CounterViewState,
  CounterViewBlocInner,
  typeof CounterViewBlocInner
>(CounterViewBlocInner);

export const CounterBloc = CubitWithContext<
  CounterState,
  CounterBlocInner,
  typeof CounterBlocInner
>(CounterBlocInner);

export const RecordsBloc = CubitWithContext<
  Records,
  RecordsBlocInner,
  typeof RecordsBlocInner
>(RecordsBlocInner);

export const TitleBloc = CubitWithContext<
  String,
  TitleBlocInner,
  typeof TitleBlocInner
>(TitleBlocInner);
