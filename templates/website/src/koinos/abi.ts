export default {
  methods: {
    test_method: {
      entry_point: 0,
      argument: "test1",
      return: "test1",
      read_only: false,
      description:
        "Lorem ip sum lorem ip sum lorem ip sum lorem ip sum lorem ip sum lorem ip sum lorem ip sum lorem ip sum lorem ip sum",
    },
  },
  koilib_types: {
    nested: {
      direction: {
        values: {
          ascending: 0,
          descending: 1,
        },
      },
      mynested1: {
        fields: {
          a1: {
            type: "string",
            id: 1,
          },
        },
      },
      test1: {
        fields: {
          v1: {
            type: "string",
            id: 1,
          },
          v2: {
            type: "bytes",
            id: 2,
            options: {
              "(koinos.btype)": "ADDRESS",
            },
          },
          v3: {
            type: "bool",
            id: 3,
          },
          v4: {
            type: "uint64",
            id: 4,
            options: {
              jstype: "JS_STRING",
            },
          },
          v5: {
            type: "mynested1",
            id: 5,
          },
          v6: {
            rule: "repeated",
            type: "string",
            id: 6,
          },
          v7: {
            rule: "repeated",
            type: "mynested1",
            id: 7,
          },
          v8: {
            type: "direction",
            id: 8,
          },
        },
      },
    },
  },
};
