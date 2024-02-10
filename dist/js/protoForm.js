const nativeTypes = [
  "double",
  "float",
  "int32",
  "int64",
  "uint32",
  "uint64",
  "sint32",
  "sint64",
  "fixed32",
  "fixed64",
  "sfixed32",
  "sfixed64",
  "bool",
  "string",
  "bytes",
];

export function prettyName(name) {
  return name
    .split("_")
    .map((word) => {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

function buildInitialInputValues(serializer, _type, _nested, _repeated) {
  if (_repeated) {
    if (_nested) {
      const protobufType = serializer.root.lookupTypeOrEnum(_type);
      if (!protobufType.fields) return "";
      const nestedArgs = Object.keys(protobufType.fields).map((f) => {
        const { type } = protobufType.fields[f];
        const nested = !nativeTypes.includes(type);
        return buildInitialInputValues(serializer, type, nested, false);
      });
      // build 1 element
      return [nestedArgs];
    }
    return [""];
  }

  if (_nested) {
    const protobufType = serializer.root.lookupTypeOrEnum(_type);
    if (!protobufType.fields) return "";
    const nestedArgs = Object.keys(protobufType.fields).map((f) => {
      const { type, rule } = protobufType.fields[f];
      const nested = !nativeTypes.includes(type);
      const repeated = rule === "repeated";
      return buildInitialInputValues(serializer, type, nested, repeated);
    });
    return nestedArgs;
  }

  return "";
}

export const ProtoForm = {
  template: `
      <div class="protoform">
        <div v-for="arg in args" class="arg">
          <div class="name">
            {{arg.prettyName}}
          </div>
          <div v-if="arg.repeated">
            <div v-for="(value, i) in arg.value" class="item">
              <div class="item-number">
                #{{i+1}}
              </div>
              <div v-if="arg.nested && !arg.isEnum">
                <proto-form 
                  :protobuftype="arg.protobufType"
                  :serializer="serializer"
                  :norepeated="true"
                  :reference="reference+'child-for'"
                  :ref="reference+'child-for'"
                ></proto-form>
              </div>
              <div v-else-if="arg.nested && arg.isEnum">
                <div v-for="en in arg.enums" class="form-radio">
                  <input type="radio" :value="en.value" v-model="arg.value"/>
                  <label>{{en.name}}</label>
                </div>
              </div>
              <div v-else>
                <input type="text" v-model="value">
              </div>
            </div>
            <div class="array-buttons">
              <button @click="addElement(arg)">Add</button>
              <button @click="removeElement(arg)">Remove</button>
            </div>
          </div>
          <div v-else-if="arg.nested && !arg.isEnum">
            <proto-form 
              :protobuftype="arg.protobufType"
              :serializer="serializer"
              :reference="reference+'child'"
              :ref="reference+'child'"
            ></proto-form>
          </div>
          <div v-else-if="arg.nested && arg.isEnum">
            <div v-for="en in arg.enums" class="form-radio">
              <input type="radio" :value="en.value" v-model="arg.value"/>
              <label>{{en.name}}</label>
            </div>
          </div>
          <div v-else>
            <input type="text" v-model="arg.value">
          </div>
          <div class="error">{{arg.error}}</div>
        </div>
      </div>
    `,

  props: {
    protobuftype: {
      type: Object,
      required: true,
    },
    serializer: {
      type: Object,
      required: true,
    },
    norepeated: {
      type: Boolean,
      required: false,
    },
    reference: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      args: null,
    };
  },

  mounted() {
    this.buildForm(this.protobuftype);
  },

  watch: {
    protobuftype: function (val) {
      this.buildForm(val);
    },
  },

  methods: {
    buildForm(_protobufType) {
      if (!_protobufType || !_protobufType.fields) {
        this.args = [
          {
            name: "no data",
            value: "",
          },
        ];
        return;
      }
      this.args = Object.keys(_protobufType.fields).map((name) => {
        const { type, rule } = _protobufType.fields[name];
        const nested = !nativeTypes.includes(type);
        const repeated = rule === "repeated" && !this.norepeated;

        let protobufType;
        let isEnum = false;
        let enums = [];
        if (nested) {
          protobufType = this.serializer.root.lookupTypeOrEnum(type);
          if (!protobufType.fields) {
            isEnum = true;
            enums = Object.keys(protobufType.values).map(v => {
              return {
                name: v,
                value: protobufType.values[v],
              };
            });
          }
        }

        const value = buildInitialInputValues(
          this.serializer,
          type,
          nested,
          repeated,
        );

        return {
          name,
          prettyName: prettyName(name),
          value,
          type,
          isEnum,
          enums,
          nested,
          repeated,
          protobufType,
          error: "",
        };
      });
    },

    addElement(arg) {
      const newValue = buildInitialInputValues(
        this.serializer,
        arg.type,
        arg.nested,
        arg.repeated,
      );
      arg.value.push(newValue);
    },

    removeElement(arg) {
      arg.value.pop();
    },

    getArgs() {
      const finalArgs = {};

      this.args.forEach((arg) => {
        const { name, value, repeated, nested, isEnum } = arg;
        if (repeated) {
          finalArgs[name] = [];
          if (nested && !isEnum) {
            const nestedArgs = this.$refs[`${this.reference}child-for`].map(
              (r) => {
                return r.getArgs();
              },
            );
            finalArgs[name] = nestedArgs;
            return;
          }

          if (nested && isEnum) {
            finalArgs[name] = value;
            return;
          }

          finalArgs[name].push("not implemented");
          return;
        }

        if (nested && !isEnum) {
          finalArgs[name] = this.$refs[`${this.reference}child`].getArgs();
          return;
        }

        if (nested && isEnum) {
          finalArgs[name] = value;
          return;
        }

        finalArgs[name] = value;
      });

      return finalArgs;
    },
  },
};
