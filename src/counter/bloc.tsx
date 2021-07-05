import Immutable from "immutable";

import { Cubit, makeCubitContext } from "./bloc_util";

export class CounterViewState {
  readonly counters: Immutable.List<CounterBloc | null>;

  constructor(counters?: Immutable.List<CounterBloc | null>) {
    this.counters = counters || Immutable.List();
  }
}

export class CounterViewBloc extends Cubit<CounterViewState> {
  static readonly $ = makeCubitContext<
    CounterViewState,
    CounterViewBloc,
    typeof CounterViewBloc
  >(CounterViewBloc);

  constructor() {
    super(new CounterViewState());
  }

  addCounter = () => {
    this.emit(
      (state) =>
        new CounterViewState(
          this.state.counters.push(new CounterBloc(state.counters.size))
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
  readonly records: RecordsBloc;
  readonly title: TitleBloc;

  constructor(defaultTitle: String, records?: Records) {
    this.title = new TitleBloc(defaultTitle);
    this.records = new RecordsBloc(records);
  }
}

export class CounterBloc extends Cubit<CounterState> {
  static readonly $ = makeCubitContext<
    CounterState,
    CounterBloc,
    typeof CounterBloc
  >(CounterBloc);

  readonly idx: number;

  constructor(idx: number, records?: Records) {
    super(new CounterState(`Counter #${idx + 1}`, records));
    this.idx = idx;
  }
}

export type Records = Immutable.List<Date>;

export class RecordsBloc extends Cubit<Records> {
  static readonly $ = makeCubitContext<
    Records,
    RecordsBloc,
    typeof RecordsBloc
  >(RecordsBloc);

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

export class TitleBloc extends Cubit<String | null> {
  static readonly $ = makeCubitContext<
    String | null,
    TitleBloc,
    typeof TitleBloc
  >(TitleBloc);

  readonly defaultTitle: String;

  constructor(defaultTitle: String) {
    super(null);
    this.defaultTitle = defaultTitle;
  }

  setTitle = (title: String) => {
    this.emit(() => (title.length === 0 ? null : title));
  };
}
