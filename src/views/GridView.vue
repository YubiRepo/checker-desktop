<template>
    <v-card>
        <main-layout>
            <v-app-bar color="primary">
                <v-btn icon @click.stop="back()">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-row>
                    <v-col cols="12">
                        <v-btn color="white" variant="tonal" @click="getSalesOrderRefresh()"
                            class="float-end mx-2">Refresh</v-btn>
                    </v-col>
                </v-row>
            </v-app-bar>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col class="mt-2" xs="12" sm="12" md="6" lg="6"
                            v-for="(items, indexHeader) in GridSalesOrder.Dine_In"
                            v-if="GridSalesOrder.Dine_In != 'Not Found'" :key="indexHeader">
                            <v-card variant="outlined">
                                <v-row>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:18px;">{{ items.tblname }}</v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:15px;">Order No. {{ items.salesseq }}</v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:15px;">
                                            {{ items.person }} Persons
                                        </v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title><v-btn color="error" variant="outlined" class="float-end"
                                                @click.stop="update(indexHeader)">Update</v-btn></v-card-title>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-row>
                                <v-col class="mt-2" xs="12" sm="12" md="12" lg="12">
                                    <div class="tableFixHead">
                                        <table>
                                            <thead
                                                style="position:sticky;top:0%;background-color:#333;color:#fff; z-index: 1000;">
                                                <tr>
                                                    <th style="color: white" width="1%">#</th>
                                                    <th style="color: white" width="15%">Item Name</th>
                                                    <th style="color: white" width="1%">Order</th>
                                                    <th style="color: white" width="40%" class="text-center">Qty Out</th>
                                                    <th style="color: white" width="10%" class="text-center">Balance</th>
                                                    <th style="color: white" width="5%" class="text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, indexDetail) in items.data" :key="indexDetail">
                                                    <td v-if="item.qty == item.qtyready"
                                                        style="background-color: #C8E6C9; ">
                                                        {{
                                                            indexDetail +
                                                            1 }}
                                                    </td>
                                                    <td v-else>{{ indexDetail + 1 }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        {{
                                                            item.menuname }}</td>
                                                    <td v-else>{{ item.menuname }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        {{
                                                            item.qty }}
                                                    </td>
                                                    <td v-else>{{ item.qty }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <v-btn-toggle>
                                                                <v-btn type="button" icon="mdi-minus"
                                                                    @click="reduceQuantity(indexHeader, indexDetail)"></v-btn>
                                                                <v-text-field type="text" v-model="item.qtyready"
                                                                    @change="calculateQty(indexHeader, indexDetail)"></v-text-field>
                                                                <v-btn type="button" icon="mdi-plus"
                                                                    @click="addQuantity(indexHeader, indexDetail)"></v-btn>
                                                                <v-btn type="button" variant="flat"
                                                                    style="background-color:#BBDEFB;"
                                                                    @click="check(indexHeader, indexDetail)"><v-icon>mdi-check-outline</v-icon></v-btn>
                                                            </v-btn-toggle>
                                                        </div>
                                                    </td>
                                                    <td v-else>
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <v-btn-toggle>
                                                                <v-btn type="button" icon="mdi-minus"
                                                                    @click="reduceQuantity(indexDetail)"></v-btn>
                                                                <v-text-field type="text" v-model="item.qtyready"
                                                                    v-if="item.qty == item.qtyready"
                                                                    @change="calculateQty(indexHeader, indexDetail)"
                                                                    readonly></v-text-field>
                                                                <v-text-field type="text" v-model="item.qtyready" v-else
                                                                    @change="calculateQty(indexHeader, indexDetail)"
                                                                    readonly></v-text-field>
                                                                <v-btn type="button" icon="mdi-plus"
                                                                    @click="addQuantity(indexHeader, indexDetail)"></v-btn>
                                                                <v-btn type="button" variant="flat"
                                                                    style="background-color:#BBDEFB;"
                                                                    @click="check(indexHeader, indexDetail)"><v-icon>mdi-check-outline</v-icon></v-btn>
                                                            </v-btn-toggle>
                                                        </div>
                                                    </td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <p class="text-center">{{ item.qty - item.qtyready }}</p>
                                                        </div>
                                                    </td>
                                                    <td v-else>
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <p class="text-center">{{ item.qty - item.qtyready }}</p>
                                                        </div>
                                                    </td>
                                                    <td class="text-center" v-if="item.qty == item.qtyready"
                                                        style="background-color: #C8E6C9;">
                                                        <v-chip class="ma-2" v-if="item.qty == item.qtyready">
                                                            DONE
                                                        </v-chip>
                                                        <v-chip class="ma-2" v-else>
                                                            NOT DONE
                                                        </v-chip>
                                                    </td>
                                                    <td class="text-center" v-else>
                                                        <v-chip class="ma-2" v-if="item.qty == item.qtyready">
                                                            DONE
                                                        </v-chip>
                                                        <v-chip class="ma-2" v-else>
                                                            NOT DONE
                                                        </v-chip>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="mt-2" cols="6" v-for="(items, indexHeader) in GridSalesOrder.Take_Away"
                            v-if="GridSalesOrder.Take_Away != 'Not Found'" :key="indexHeader">
                            <v-card variant="outlined">
                                <v-row>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:20px;">Take
                                            Away</v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:15px;">Order No. {{ items.salesseq }}</v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title style="font-size:15px;"><v-chip color="warning">{{ items.statusorder
                                        }}</v-chip></v-card-title>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-card-title class="float-end"><v-btn color="error" variant="outlined"
                                                @click.stop="update(indexHeader, 'Take_Away')">Update</v-btn></v-card-title>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-row>
                                <v-col class="mt-2" cols="12">
                                    <div class="tableFixHead">
                                        <table>
                                            <thead
                                                style="position:sticky;top:0%;background-color:#333;color:#fff; z-index: 1000;">
                                                <tr>
                                                    <th style="color: white" width="1%">#</th>
                                                    <th style="color: white" width="25%">Item Name</th>
                                                    <th style="color: white" width="1%">Order</th>
                                                    <th style="color: white" width="40%" class="text-center">Qty Out</th>
                                                    <th style="color: white" width="20%" class="text-center">Balance</th>
                                                    <th style="color: white" width="5%" class="text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, indexDetail) in items.data" :key="indexDetail">
                                                    <td v-if="item.qty == item.qtyready"
                                                        style="background-color: #C8E6C9; ">
                                                        {{
                                                            indexDetail +
                                                            1 }}
                                                    </td>
                                                    <td v-else>{{ indexDetail + 1 }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        {{
                                                            item.menuname }}</td>
                                                    <td v-else>{{ item.menuname }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        {{
                                                            item.qty }}
                                                    </td>
                                                    <td v-else>{{ item.qty }}</td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <v-btn-toggle>
                                                                <v-btn type="button" icon="mdi-minus"
                                                                    @click="reduceQuantityTakeAway(indexHeader, indexDetail)"></v-btn>
                                                                <v-text-field type="text" v-model="item.qtyready"
                                                                    @change="calculateQtyTakeAway(indexHeader, indexDetail)"></v-text-field>
                                                                <v-btn type="button" icon="mdi-plus"
                                                                    @click="addQuantityTakeAway(indexHeader, indexDetail)"></v-btn>
                                                                <v-btn type="button" variant="flat"
                                                                    style="background-color:#BBDEFB;"
                                                                    @click="checkTakeAway(indexHeader, indexDetail)"><v-icon>mdi-check-outline</v-icon></v-btn>
                                                            </v-btn-toggle>
                                                        </div>
                                                    </td>
                                                    <td v-else>
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <v-btn-toggle>
                                                                <v-btn type="button" icon="mdi-minus"
                                                                    @click="reduceQuantityTakeAway(indexDetail)"></v-btn>
                                                                <v-text-field type="text" v-model="item.qtyready"
                                                                    v-if="item.qty == item.qtyready"
                                                                    @change="calculateQtyTakeAway(indexHeader, indexDetail)"
                                                                    readonly></v-text-field>
                                                                <v-text-field type="text" v-model="item.qtyready" v-else
                                                                    @change="calculateQtyTakeAway(indexHeader, indexDetail)"
                                                                    readonly></v-text-field>
                                                                <v-btn type="button" icon="mdi-plus"
                                                                    @click="addQuantityTakeAway(indexHeader, indexDetail)"></v-btn>
                                                                <v-btn type="button" variant="flat"
                                                                    style="background-color:#BBDEFB;"
                                                                    @click="checkTakeAway(indexHeader, indexDetail)"><v-icon>mdi-check-outline</v-icon></v-btn>
                                                            </v-btn-toggle>
                                                        </div>
                                                    </td>
                                                    <td v-if="item.qty == item.qtyready" style="background-color: #C8E6C9;">
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <p class="text-center">{{ item.qty - item.qtyready }}</p>
                                                        </div>
                                                    </td>
                                                    <td v-else>
                                                        <div class="d-flex align-left flex-column pa-6">
                                                            <p class="text-center">{{ item.qty - item.qtyready }}</p>
                                                        </div>
                                                    </td>
                                                    <td class="text-center" v-if="item.qty == item.qtyready"
                                                        style="background-color: #C8E6C9;">
                                                        <v-chip class="ma-2" v-if="item.qty == item.qtyready">
                                                            DONE
                                                        </v-chip>
                                                        <v-chip class="ma-2" v-else>
                                                            NOT DONE
                                                        </v-chip>
                                                    </td>
                                                    <td class="text-center" v-else>
                                                        <v-chip class="ma-2" v-if="item.qty == item.qtyready">
                                                            DONE
                                                        </v-chip>
                                                        <v-chip class="ma-2" v-else>
                                                            NOT DONE
                                                        </v-chip>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
                    Order has been updated.
                    <template v-slot:actions>
                        <v-btn class="white--text" variant="text" @click="snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-main>
        </main-layout>
    </v-card>
</template>
<style scoped>
.tableFixHead {
    overflow-y: auto;
    max-height: 500px;
}

.tableFixHead thead th {
    position: sticky;
    top: 0px;
    background-color: #4B81FF;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px 16px;
    border: 1px solid #221f1f;
}

th {
    background: #eee;
}
</style>
<script>

import MainLayout from "../layouts/MainLayout.vue";
import { mapGetters, mapMutations } from "vuex";
import $axios from "@/plugins/api.js";

export default {
    name: "GridView",
    components: {
        MainLayout,
    },
    data() {
        return {
            loading: false,
            dialog: false,
            detail: [],
            detailorder: [],
            balance: 0,
            form_data: [],
            no_table: "",
            snackbar: false,
        };
    },

    created() {
        this.getSalesOrders();
    },

    methods: {
        ...mapMutations("grid_sales_order", ["SET_GRID_SALES_ORDER"]),
        ...mapMutations("sales_order_remain", ["SET_SALES_ORDER_REMAIN"]),
        async update(indexHeader, type = "Dine_In") {
            let salesHeader = [];
            let salesDetail = [];
            if (type == "Dine_In") {
                salesHeader = this.GridSalesOrder.Dine_In[indexHeader];
                salesDetail = this.GridSalesOrder.Dine_In[indexHeader].data;
            } else {
                salesHeader = this.GridSalesOrder.Take_Away[indexHeader];
                salesDetail = this.GridSalesOrder.Take_Away[indexHeader].data;
            }
            this.loading = true;
            let body = salesDetail.map((item) => {
                return {
                    menuseq: item.menuseq,
                    salesdate: salesHeader.salesdate,
                    salesseq: salesHeader.salesseq,
                    qtyready: item.qtyready,
                };
            });
            const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/apporder/api/updatecheckerall`, {
                method: "POST",
                body: JSON.stringify({ "detailorder": body }),
            })
                .then((res) => res.json())
                .then((res) => {
                    this.loading = false;
                    this.dialog = false;
                    this.getSalesOrders();
                    this.snackbar = true;
                });
        },

        async getSalesOrders() {
            this.loading = true;
            await $axios
                .get("/apporder/api/allOrder", {
                })
                .then(({ data }) => {
                    this.SET_GRID_SALES_ORDER(data);
                    this.SET_SALES_ORDER_REMAIN(data.Item);
                    this.loading = false;
                });
        },

        async getSalesOrderDetail(salesseq) {
            this.loading = true;
            this.dialog = true;
            await $axios
                .get("/apporder/api/allOrderid/" + salesseq, {
                })
                .then(({ data }) => {
                    this.header = data.Order[0];
                    this.detail = data.Order[0].data;
                    this.detailorder = data.Order[0].data;
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

        addQuantity(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready >= this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty) {
                return;
            }
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready += 1;
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].balance -= 1;
        },
        addQuantityTakeAway(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready >= this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty) {
                return;
            }
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready += 1;
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].balance -= 1;
        },

        reduceQuantity(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready <= 0) {
                return;
            }
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready -= 1;
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].balance += 1;
        },

        reduceQuantityTakeAway(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready <= 0) {
                return;
            }
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready -= 1;
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].balance += 1;
        },
        check(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready > this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty) {
                alert("Qty Out can't be greater than Qty");
                this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty;
                return;
            }
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].on_done = this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready;
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty;
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].balance = 0;
        },

        checkTakeAway(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready > this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty) {
                alert("Qty Out can't be greater than Qty");
                this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty;
                return;
            }
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].on_done = this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready;
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty;
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].balance = 0;
        },

        calculateQty(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready > this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty) {
                alert("Qty Out can't be greater than Qty");
                this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].qty;
                return;
            }
            this.GridSalesOrder.Dine_In[indexHeader].data[indexDetail].balance = 0;
        },

        calculateQtyTakeAway(indexHeader, indexDetail) {
            if (this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready > this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty) {
                alert("Qty Out can't be greater than Qty");
                this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qtyready = this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].qty;
                return;
            }
            this.GridSalesOrder.Take_Away[indexHeader].data[indexDetail].balance = 0;
        },

        async getSalesOrderRefresh() {
            this.getSalesOrders();
        },

        back() {
            this.$router.push({ path: '/' })
        },

    },

    computed: {
        ...mapGetters("grid_sales_order", ["GridSalesOrder"]),
        ...mapGetters("sales_order_remain", ["SalesOrderRemain"]),
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
</style>
