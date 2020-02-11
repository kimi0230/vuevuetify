<template>
  <v-card class="mx-auto">
    <!-- <v-card-subtitle>User List</v-card-subtitle> -->
    <v-card-text>
      <!-- 標題與收尋欄 -->
      <v-card-title>
        <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          @keyup.enter="getFromAjax"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :options.sync="options"
        :items-per-page="itemsPerPage"
        :loading="loading"
        hide-default-footer
        class="elevation-1"
      >
        <!-- avatarPath圖片處理 -->
        <template v-slot:item.avatarPath="{ item, header, value }">
          <div class="p-2">
            <v-img
              :src="item.avatarPath"
              lazy-src="https://picsum.photos/id/92/11/15"
              aspect-ratio="1"
              class="grey lighten-2"
              width="100"
              height="100"
              v-if="item.avatarPath && header.isCompute"
            ></v-img>
            <p v-else>{{value}}</p>
          </div>
        </template>

        <!-- 是否為公司 -->
        <template v-slot:item.isCompany="{ item, header, value }">
          <span v-if="header.isCompute">{{value ? "yes" : "no"}}</span>
          <p v-else>{{value}}</p>
        </template>
        <!-- 時間處理 -->
        <template v-slot:item.createdAt="{ item, header, value }">
          <time-format :timeValue="value" />
        </template>
        <!-- 時間處理 -->
        <template v-slot:item.updatedAt="{ item, header, value }">
          <time-format :timeValue="value" />
        </template>
        <!-- 時間處理 -->

        <!-- 編輯刪除按鈕 -->
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" v-if="enableEdditItem">edit</v-icon>
          <v-icon small @click="deleteItem(item)" v-if="enableDeleteItem">delete</v-icon>
        </template>
      </v-data-table>

      <!-- 分頁按鈕 -->
      <v-pagination
        v-model="nowPage"
        :circle="circle"
        :disabled="disabled"
        :length="length"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :page="page"
        :total-visible="totalVisible"
      ></v-pagination>
    </v-card-text>

    <!-- 新增按鈕 -->
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog" v-if="enableNewItem">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- 彈掉視窗 -->
    <v-dialog v-model="dialog" max-width="100%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <!-- 想要修改的內容 -->
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row>
                <template v-for="(headerItem, i) in headers">
                  <template v-if="headerItem.visible">
                    <v-col cols="12" sm="6" md="4" :key="i">
                      <!-- 根據header來的tag 決定component -->
                      <component
                        v-if="headerItem.tag"
                        :is="currentTag=headerItem.tag"
                        :prospTitle="headerItem.text"
                        :prospKey="headerItem.value"
                        :prospValue="editedItem[headerItem.value]"
                        :prospItems="headerItem.items"
                        v-model="editedItem[headerItem.value]"
                        @updateEditedItem="updateEditedItem"
                      ></component>
                      <!-- 預設使用text field -->
                      <v-text-field
                        v-model="editedItem[headerItem.value]"
                        :rules="headerItem.rule"
                        :label="headerItem.text"
                        :disabled="headerItem.disabledEdit"
                        :readonly="headerItem.disabledEdit"
                        :prepend-icon="headerItem.requiredIcon?'mdi-star':''"
                        v-else
                      ></v-text-field>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click.stop="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { Ajax } from "@/utils/ajax/index";
import dataTable from "@/config/dataTable";
import Radios from "@/components/Radios";
import TimeFormat from "@/components/TimeFormat";

export default {
  name: "tablepagination",
  props: [
    "toolbarTitle",
    "url",
    "enableNewItem",
    "enableEdditItem",
    "enableDeleteItem",
    "tableHeader",
    "editedItemPros"
  ],
  data() {
    return {
      loading: false,
      headers: this.tableHeader, //塞表格title
      items: dataTable.initConfig.items, //塞表格資料
      options: dataTable.initConfig.options,
      search: dataTable.initConfig.search,
      length: dataTable.initConfig.length,
      page: dataTable.initConfig.page,
      nowPage: 1,
      circle: dataTable.initConfig.circle,
      disabled: dataTable.initConfig.disabled,
      nextIcon: dataTable.initConfig.nextIcon,
      prevIcon: dataTable.initConfig.prevIcon,
      totalVisible: dataTable.initConfig.totalVisible,
      itemsPerPage: dataTable.initConfig.itemsPerPage,
      dialog: false, // 編輯畫面開關
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      currentTag: ""
    };
  },
  mounted() {
    // 如果要編輯時, 把需要編輯的欄位帶入
    if (this.enableEdditItem || this.enableDeleteItem) {
      this.editedItem = this.editedItemPros;
      this.defaultItem = this.editedItemPros;
    }
    // this.getFromAjax();
  },
  methods: {
    getFromAjax() {
      this.loading = true;
      const vm = this;
      const ajaxParam = {
        keyWord: this.search,
        page: this.nowPage,
        itemsPerPage: this.itemsPerPage,
        sortBy: this.options.sortBy[0],
        sortMethod: this.options.sortDesc[0] ? "desc" : "asc"
      };
      console.log("ajaxParam : ", ajaxParam);
      const getAjax = (async () => {
        const data = await Ajax(
          "post",
          process.env.VUE_APP_API_URL + this.url + "/list",
          ajaxParam
        );
        if (!data.Result.status) {
          //有錯誤跳 snackbar
          vm.$store.dispatch("updateSnackBar", {
            snackbar: true,
            color: "error",
            text: data.Result.message
          });
        } else {
          this.items = data.Data.items;
          this.nowPage = data.Data.page;
          this.length = data.Data.totalPages;
        }
        this.loading = false;
      })();
    },
    // 打開編輯畫面
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    // 關閉編輯畫面
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // 刪除資料
    deleteItem(item) {
      const vm = this;
      console.log("deleteItem ===>", item);
      const index = this.items.indexOf(item);

      if (confirm("Are you sure you want to delete this item?")) {
        console.log("call ajax delete", item);
        // TODO: AJAX 刪資料
        let ajaxParam = {};
        const getAjax = (async () => {
          const data = await Ajax(
            "post",
            process.env.VUE_APP_API_URL + this.url + "/delete",
            ajaxParam
          );
          if (!data.Result.status) {
            //有錯誤跳 snackbar
            vm.$store.dispatch("updateSnackBar", {
              snackbar: true,
              color: "error",
              text: data.Result.message
            });
          } else {
            // 刪除成功
            // table資料刷新
            console.log("---- 刪除成功");
            this.getFromAjax();
          }
        })();
      }
    },
    // 保存資料
    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          // TODO: update AJAX
          let ajaxParam = {};
          const getAjax = (async () => {
            const data = await Ajax(
              "post",
              process.env.VUE_APP_API_URL + this.url + "/update",
              ajaxParam
            );
            if (!data.Result.status) {
              //有錯誤跳 snackbar
              this.$store.dispatch("updateSnackBar", {
                snackbar: true,
                color: "error",
                text: data.Result.message
              });
            } else {
              // 刪除成功
              // table資料刷新
              this.$store.dispatch("updateSnackBar", {
                snackbar: true,
                color: "info",
                text: data.Result.message
              });
              this.getFromAjax();
            }
          })();
          console.log("update ===>", this.editedItem);
        } else {
          // TODO: create AJAX
          let ajaxParam = {};
          const getAjax = (async () => {
            const data = await Ajax(
              "post",
              process.env.VUE_APP_API_URL + this.url + "/insert",
              ajaxParam
            );
            if (!data.Result.status) {
              //有錯誤跳 snackbar
              this.$store.dispatch("updateSnackBar", {
                snackbar: true,
                color: "error",
                text: data.Result.message
              });
            } else {
              // 刪除成功
              // table資料刷新
              this.$store.dispatch("updateSnackBar", {
                snackbar: true,
                color: "info",
                text: data.Result.message
              });
              this.getFromAjax();
            }
          })();
          console.log("insert: ===>", this.editedItem);
        }
        this.close();
      }
    },
    // 給編輯視窗的元件使用, emit 事件,更新被編輯的欄位資料
    updateEditedItem(obj) {
      console.log("updateEditedItem ===>", obj);
      this.editedItem[obj.key] = obj.val;
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    nowPage() {
      this.getFromAjax();
    },
    options() {
      this.getFromAjax();
    }
  },
  components: {
    Radios,
    TimeFormat
  }
};
</script>


<style scoped>
.required label::after {
  content: "*";
}
</style>