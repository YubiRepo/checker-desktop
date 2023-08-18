<template>
    <v-card>
        <main-layout>
            <v-app-bar color="primary">
                <v-btn icon @click.stop="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </v-app-bar>
            <v-main>
                <v-container>
                    <v-row>
                        <v-col class="mt-2" cols="2">
                            <v-card color="primary">
                                <v-card-title class="font">Din In : {{ count_dine_in }}</v-card-title>
                            </v-card>
                        </v-col>
                        <v-col class="mt-2" cols="2">
                            <v-card color="primary">
                                <v-card-title class="font">Take Away : {{ count_take_away }}</v-card-title>
                            </v-card>
                        </v-col>
                        <v-col class="mt-2 text-center" cols="4">
                            <v-card-title class="font_size"><b>Order List</b></v-card-title>
                        </v-col>
                        <v-col class="mt-2 " cols="2">
                            <v-card color="primary" @click.stop="toGrid()">
                                <v-card-title class="font"><v-icon>mdi-grid</v-icon>&nbsp;Grid
                                    View</v-card-title>
                            </v-card>
                        </v-col>
                        <v-col class="mt-2" cols="2">
                            <v-card color="primary">
                                <v-card-title class="font">Total Order : {{ all_count }}</v-card-title>
                            </v-card>
                        </v-col>
                    </v-row>
                    <br>
                    <br>
                    <v-row>
                        <v-responsive>
                            <v-tabs v-model="tab" color="#FF6565" align-tabs="center">
                                <v-tab value="1">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            All
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                                <v-tab value="2">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            Dine In
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                                <v-tab value="3">
                                    <v-card color="white" width="200">
                                        <v-card-title class="font_size">
                                            Take Away
                                        </v-card-title>
                                    </v-card>
                                </v-tab>
                            </v-tabs>
                            <v-card-text>
                                <v-window v-model="tab">
                                    <v-window-item value="1">
                                        <TabAll />
                                    </v-window-item>
                                    <v-window-item value="2">
                                        <TabDineIn />
                                    </v-window-item>
                                    <v-window-item value="3">
                                        <TabTakeAway />
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-responsive>
                    </v-row>
                </v-container>
                <v-navigation-drawer v-model="drawer" temporary location="right" :width="400">
                    <h3 class="text-center my-3">Remaining Orders</h3>
                    <v-divider></v-divider>
                    <div v-for="row in SalesOrderRemain" v-if="SalesOrderRemain != 'Not Found'">
                        <v-list density="compact" nav class="width:100%">
                            <v-list-item style="max-width: auto;font-family:sans-serif ;font-size: large;">
                                {{ row.menuname }} ({{ row.jumlah }} Items)
                            </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                    </div>
                </v-navigation-drawer>
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

<script>
import MainLayout from "../layouts/MainLayout.vue";
import TabAll from "../components/Tabs/All.vue";
import TabDineIn from "../components/Tabs/DineIn.vue";
import TabTakeAway from "../components/Tabs/TakeAway.vue";
import { mapGetters, mapMutations } from "vuex";
import $axios from "@/plugins/api.js";

export default {
    name: "Home",
    components: {
        MainLayout,
        TabAll,
        TabDineIn,
        TabTakeAway,
    },

    data() {
        return {
            tab: null,
            drawer: false,
            snackbar: false,
            count_dine_in: 0,
            count_take_away: 0,
            all_count: 0,
        };
    },

    created() {
        this.getSalesOrder();
    },

    methods: {
        ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
        ...mapMutations("sales_order_remain", ["SET_SALES_ORDER_REMAIN"]),
        async getSalesOrder() {
            this.loading = true;
            await $axios
                .get("/apporder/api/allOrder", {
                })
                .then(({ data }) => {
                    if (data.Dine_In != "Not Found") {
                        this.count_dine_in = data.Dine_In.length;
                    } else {
                        this.count_dine_in = 0;
                    }
                    if (data.Take_Away != "Not Found") {
                        this.count_take_away = data.Take_Away.length;
                    } else {
                        this.count_take_away = 0;
                    }
                    this.all_count = this.count_dine_in + this.count_take_away;
                    this.SET_SALES_ORDER_REMAIN(data.Item);
                    this.loading = false;
                });

        },

        toGrid() {
            this.$router.push({ path: '/grid' })
        },
    },

    computed: {
        ...mapGetters("sales_order", ["SalesOrder"]),
        ...mapGetters("sales_order_remain", ["SalesOrderRemain"]),
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
