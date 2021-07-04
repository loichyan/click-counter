import Immutable from "immutable";

import { Cubit, CubitWithContext } from "./bloc_util";

export class CounterViewState {
  readonly counters: Immutable.List<CounterBlocInner | null>;

  constructor(counters?: Immutable.List<CounterBlocInner | null>) {
    this.counters = counters || Immutable.List();
  }
}

export class CounterViewBlocInner extends Cubit<CounterViewState> {
  constructor() {
    super(new CounterViewState());
  }

  addCounter = () => {
    this.emit(
      (state) =>
        new CounterViewState(
          this.state.counters.push(new CounterBlocInner(state.counters.size))
        )
    );
  };

  removeCounter = (idx: number) => {
    this.emit((state) => new CounterViewState(state.counters.set(idx, null)));
  };

  clearCounter = () => {
    this.emit((state) => new CounterViewState(state.counters.clear()));
  };
}

export class CounterState {
  readonly records: RecordsBlocInner;
  readonly title: TitleBlocInner;

  constructor(defaultTitle: String, records?: Records) {
    this.title = new TitleBlocInner(defaultTitle);
    this.records = new RecordsBlocInner(records);
  }
}

export class CounterBlocInner extends Cubit<CounterState> {
  readonly idx: number;

  constructor(idx: number, records?: Records) {
    super(new CounterState(`Counter #${idx + 1}`, records));
    this.idx = idx;
  }
}

export type Records = Immutable.List<Date>;

export class RecordsBlocInner extends Cubit<Records> {
  constructor(records?: Records) {
    super(records || Immutable.List());
  }

  pushRecord = (time?: Date) => {
    this.emit((state) => state.push(time || new Date()));
  };

  popRecord = () => {
    this.emit((state) => state.pop());
  };
}

export class TitleBlocInner extends Cubit<String | null> {
  readonly defaultTitle: String;

  constructor(defaultTitle: String) {
    super(null);
    this.defaultTitle = defaultTitle;
  }

  setTitle = (title: String) => {
    this.emit(() => (title.length === 0 ? null : title));
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
  String | null,
  TitleBlocInner,
  typeof TitleBlocInner
>(TitleBlocInner);
