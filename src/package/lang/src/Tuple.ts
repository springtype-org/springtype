export class Tuple2<T1, T2> {
    private constructor(public _1: T1, public _2: T2) {
    }

    static of<T1, T2, T3>(_1: T1, _2: T2): Tuple2<T1, T2> {
        return new Tuple2<T1, T2>(_1, _2);
    }
}

export class Tuple3<T1, T2, T3> {
    private constructor(public _1: T1, public _2: T2, public _3: T3) {
    }

    static of<T1, T2, T3>(_1: T1, _2: T2, _3: T3): Tuple3<T1, T2, T3> {
        return new Tuple3<T1, T2, T3>(_1, _2, _3);
    }
}

