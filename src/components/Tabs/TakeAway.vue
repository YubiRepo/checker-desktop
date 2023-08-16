<template>
  <main-layout>
    <v-main>
      <v-responsive>
        <v-row>
          <v-card-title> </v-card-title>
        </v-row>
        <v-form ref="form_data">
          <v-row class="mt-3">
            <v-col v-for="row in SalesOrder.Take_Away" cols="2" :key="row.id" v-if="SalesOrder.Take_Away != 'Not Found'">
              <v-card height="100%" :color="row.statusorder == 'complete' ? 'green' : 'yellow'" class="pa-3"
                @click="getSalesOrderDetail(row.salesseq)">
                <v-row class="flex mx-auto">
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-2 font_card">{{ 'Take Away' }} ({{ row.salesseq }})</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3>
                      {{ row.lama }}
                    </h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <v-divider :thickness="2"></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="text-center" lg="12">
                    <h3 class="ma-2">Order No. {{ row.salesseq }}
                    </h3>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-responsive>
    </v-main>
    <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
      Order has been updated.

      <template v-slot:actions>
        <v-btn class="white--text" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" v-if="dialog" hide-overlay width="60%">
      <v-card>
        <v-row no-gutter>
          <v-col xs="12" sm="12" md="4" lg="4">
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" class="text-center">
            <v-card-title class="font_card">
              Summary
            </v-card-title>
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" class="text-right">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" @click="dialog = false">
                Close Dialog
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row no-gutter style="justify-content: center;">
          <v-col xs="12" sm="12" md="4" lg="3">
            <v-card height="100%" color="black" class="pa-3">
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-3 font_number" style="color:white"> {{ detail.length }}</h3>
                </v-col>
              </v-row>
              <v-divider :thickness="3" color="white"></v-divider>
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_card" style="color:white">Items</h3>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="3">
            <v-card height="100%" color="green" class="pa-3">
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-3 font_number">{{
                    this.detailItem.reduce((acc, item) => acc + item.qtyready, 0)
                  }}</h3>
                </v-col>
              </v-row>
              <v-divider :thickness="2"></v-divider>
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_card">Done</h3>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="3">
            <v-card height="100%" color="yellow" class="pa-3">
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-3 font_number">{{
                    this.detailItem.reduce((acc, item) => acc + item.qty, 0) - this.detailItem.reduce((acc, item) => acc +
                      item.qtyready, 0)
                  }}</h3>
                </v-col>
              </v-row>
              <v-divider :thickness="2"></v-divider>
              <v-row>
                <v-col class="text-center" lg="12">
                  <h3 class="ma-2 font_card">Not Done</h3>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <br>
        <v-divider :thickness="2"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-table>
                <thead style="background-color:#4B81FF">
                  <tr>
                    <th style="color: white">#</th>
                    <th style="color: white">Item Name</th>
                    <th style="color: white">Order</th>
                    <th style="color: white" class="text-center">Qty Out</th>
                    <th style="color: white" class="text-center">Balance</th>
                    <th style="color: white" class="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(items, index) in detail" :key="index">
                    <td v-if="items.qty == items.qtyready" style="background-color: #C8E6C9; ">{{
                      index +
                      1 }}
                    </td>
                    <td v-else>{{ index + 1 }}</td>
                    <td v-if="items.qty == items.qtyready" style="background-color: #C8E6C9;">{{ items.menuname }}</td>
                    <td v-else>{{ items.menuname }}</td>
                    <td v-if="items.qty == items.qtyready" style="background-color: #C8E6C9;">{{ items.qty }}
                    </td>
                    <td v-else>{{ items.qty }}</td>
                    <td v-if="items.qty == items.qtyready" style="background-color: #C8E6C9;">
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-btn type="button" icon="mdi-minus" @click="reduceQuantity(index)"></v-btn>
                          <v-text-field type="number" v-model="items.qtyready"
                            @change="calculateQty(index)"></v-text-field>
                          <v-btn type="button" icon="mdi-plus" @click="addQuantity(index)"></v-btn>
                          <v-btn type="button" variant="flat" style="background-color:#BBDEFB;"
                            @click="check(index)"><v-icon>mdi-check-outline</v-icon></v-btn>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td v-else>
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-btn type="button" icon="mdi-minus" @click="reduceQuantity(index)"></v-btn>
                          <v-text-field type="text" v-model="items.qtyready" v-if="items.qty == items.qtyready"
                            @change="calculateQty(index)" readonly></v-text-field>
                          <v-text-field type="text" v-model="items.qtyready" v-else @change="calculateQty(index)"
                            readonly></v-text-field>
                          <v-btn type="button" icon="mdi-plus" @click="addQuantity(index)"></v-btn>
                          <v-btn type="button" variant="flat" style="background-color:#BBDEFB;"
                            @click="check(index)"><v-icon>mdi-check-outline</v-icon></v-btn>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td v-if="items.qty == items.qtyready" style="background-color: #C8E6C9;">
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-text-field type="number" v-model="items.balance" readonly></v-text-field>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td v-else>
                      <div class="d-flex align-left flex-column pa-6">
                        <v-btn-toggle>
                          <v-text-field type="number" v-model="items.balance" readonly></v-text-field>
                        </v-btn-toggle>
                      </div>
                    </td>
                    <td class="text-center" v-if="items.qty == items.qtyready" style="background-color: #C8E6C9;">
                      <v-chip class="ma-2" v-if="items.qty == items.qtyready">
                        DONE
                      </v-chip>
                      <v-chip class="ma-2" v-else>
                        NOT DONE
                      </v-chip>
                    </td>
                    <td class="text-center" v-else>
                      <v-chip class="ma-2" v-if="items.qty == items.qtyready">
                        DONE
                      </v-chip>
                      <v-chip class="ma-2" v-else>
                        NOT DONE
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <br />
          <v-btn :disabled="loading" color="primary" variant="flat" class="float-end" @click.stop="update">Update Sales
            Order</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </main-layout>
</template>
<script>
import $axios from "@/plugins/api.js";
import MainLayout from "../../layouts/MainLayout.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TakeAway",
  components: { MainLayout },

  data() {
    return {
      loading: false,
      dialog: false,
      header: [],
      detail: [],
      detailorder: [],
      detailItem: [],
      on_process: 0,
      form_data: [],
      snackbar: false,
    };
  },

  created() {
    this.getSalesOrder();
    this.countDownTimer();
  },

  methods: {
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
    async update() {
      this.loading = true;
      this.detail = this.detail.map((item) => {
        return {
          menuseq: item.menuseq,
          salesdate: this.header.salesdate,
          salesseq: this.header.salesseq,
          qtyready: item.qtyready,
        };
      });
      // console.log();
      const res = await fetch("http://192.168.1.250:8081/apporder/api/updatecheckerall", {
        method: "POST",
        body: JSON.stringify({ "detailorder": this.detail }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.loading = false;
          this.dialog = false;
          this.getSalesOrder();
        });
    },

    async getSalesOrder() {
      this.loading = true;
      await $axios
        .get("http://192.168.1.250:8081/apporder/api/allOrder", {
        })
        .then(({ data }) => {
          this.SET_SALES_ORDER(data);
          this.loading = false;
        });
    },

    async getSalesOrderDetail(salesseq) {
      this.loading = true;
      this.dialog = true;
      await $axios
        .get("http://192.168.1.250:8081/apporder/api/allOrderid/" + salesseq, {
        })
        .then(({ data }) => {
          this.header = data.Order[0];
          this.detail = data.Order[0].data;
          this.detailorder = data.Order[0].data;
          this.detailItem = data.Order[0].data;
          this.detail.map((item) => {
            Object.assign(item, {
              qtyready: item.qtyready,
              balance: item.qty - item.qtyready,
            });
            item.qtyready = item.qtyready;
          });
          this.loading = false;

        });
    },

    addQuantity(index) {
      if (this.detail[index].qtyready >= this.detail[index].qty) {
        return;
      }
      this.detail[index].qtyready += 1;
      this.detail[index].balance -= 1;
    },

    reduceQuantity(index) {
      if (this.detail[index].qtyready <= 0) {
        return;
      }
      this.detail[index].qtyready -= 1;
      this.detail[index].balance += 1;
    },

    check(index) {
      if (this.detail[index].qtyready > this.detail[index].qty) {
        alert("Qty Out can't be greater than Qty");
        return;
      }
      this.detail[index].on_done = this.detail[index].qtyready;
      this.detail[index].qtyready = this.detail[index].qty;
      this.detail[index].balance = 0;
    },

    calculateQty(index) {
      if (this.detail[index].qtyready > this.detail[index].qty) {
        alert("Qty Out can't be greater than Qty");
        this.detail[index].qtyready = this.detail[index].qty;
        return;
      }
      this.detail[index].balance = this.detail[index].qty - this.detail[index].qtyready;
    },

    countDownTimer() {
      setInterval(() => {
        this.getSalesOrder()
      }, 10000)
    },
  },

  computed: {
    ...mapGetters("sales_order", ["SalesOrder"]),
    ...mapGetters("auth", ["User"]),
  },
};
</script>
<style>
.font {
  font-family: Arial, sans-serif;
}

.font_size {
  font-size: 20px;
  font-weight: 900;
  font-family: Arial, sans-serif;
}

.font_card {
  font-size: 23px;
  font-family: Arial, sans-serif;
  color: #000000;
}

.font_number {
  font-size: 47px;
  font-family: Arial, sans-serif;
  color: #000000;
}

.font_color {
  color: white;
}
</style>