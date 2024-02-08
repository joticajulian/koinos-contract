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

  function buildInitialInputValues(serializer, _type, _nested, _repeated) {
    if (_repeated) {
      if (_nested) {
        const protobufType = serializer.root.lookupTypeOrEnum(_type);
        const nestedArgs = Object.keys(protobufType.fields).map(f => {
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
      const nestedArgs = Object.keys(protobufType.fields).map(f => {
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
      <div class="args">
        <div v-for="arg in args">arg: {{arg.name}}
          <div v-if="arg.repeated">
            <div v-for="value in arg.value">
              <div v-if="arg.nested">
                <proto-form 
                  :protobuftype="arg.protobufType"
                  :serializer="serializer"
                  :norepeated="true"
                  :reference="reference+'child-for'"
                  :ref="reference+'child-for'"
                ></proto-form>
              </div>
              <div v-else>
                <div class="title">item in for</div>
                <input type="text" v-model="value">
              </div>
            </div>
            <div>
              <button @click="addElement(arg)">Add</button>
              <button @click="removeElement(arg)">Remove</button>
            </div>
          </div>
          <div v-else-if="arg.nested"> nested here
            <proto-form 
              :protobuftype="arg.protobufType"
              :serializer="serializer"
              :reference="reference+'child'"
              :ref="reference+'child'"
            ></proto-form>
          </div>
          <div v-else>
            <div class="title">{{arg.name}}</div>
            <input type="text" v-model="arg.value">
          </div>
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
      }
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
      protobuftype: function(val) {
        this.buildForm(val);
      }
    },

    methods: {
      buildForm(_protobufType) {
        if (!_protobufType || !_protobufType.fields) {
          this.args = [{
            name: "no data",
            value: "",
          }];
          return;
        }
        this.args = Object.keys(_protobufType.fields).map(f => {
          const { type, rule } = _protobufType.fields[f];
          const nested = !nativeTypes.includes(type);
          const repeated = rule === "repeated" && !this.norepeated;

          let protobufType;
          if (nested) {
            protobufType = this.serializer.root.lookupTypeOrEnum(type);
          }

          const value = buildInitialInputValues(
            this.serializer,
            type,
            nested,
            repeated,
          );

          return {
            name: f,
            value,
            type,
            nested,
            repeated,
            protobufType,
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
          const { name, value, repeated, nested } = arg;
          if (repeated) {
            finalArgs[name] = [];
            if (nested) {
              const nestedArgs = this.$refs[`${this.reference}child-for`].map(r => {
                return r.getArgs();
              });
              finalArgs[name] = nestedArgs;
              return;
            }
            
            finalArgs[name].push("not implemented");
            return;
          }
          
          if (nested) {
            finalArgs[name] = this.$refs[`${this.reference}child`].getArgs();
            return;
          }
          
          finalArgs[name] = value;
        });

        return finalArgs;
      }
    },
  };

  export default ProtoForm;
  