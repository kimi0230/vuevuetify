<template>
  <div class="text-center">
    <TablePagination
      :url="url"
      :enableNewItem="enableNewItem"
      :enableEdditItem="enableEdditItem"
      :toolbarTitle="toolbarTitle"
      :enableDeleteItem="enableDeleteItem"
      :tableHeader="tableHeader"
      :editedItemPros="editedItem"
    />
  </div>
</template>

<script>
import TablePagination from "@/components/TablePagination.vue";
import Rules from "@/config/verifyRule";

export default {
  name: "mytable",
  components: {
    TablePagination
  },
  data() {
    return {
      url: "/api/user",
      enableNewItem: true,
      enableEdditItem: true,
      enableDeleteItem: true,
      toolbarTitle: "User List",
      // data table的表題
      /*
       {
        text:"table 標題名稱", 
        align: "位置",
        value: "DB欄位名稱", 
        rule: "欄位規則", 
        visible:"是否要在修改頁面出現",
        disabledEdit:"在修改頁面是否可以編輯"
       }
       */
      tableHeader: [
        {
          text: "流水號",
          align: "left",
          value: "id",
          requiredIcon: false,
          visible: true,
          disabledEdit: true
        },
        {
          text: "帳號",
          value: "email",
          requiredIcon: true,
          rule: Rules.emailRule,
          visible: true,
          disabledEdit: false
        },
        {
          text: "名稱",
          value: "name",
          requiredIcon: true,
          rule: Rules.requiredRule,
          visible: true,
          disabledEdit: false
        },
        {
          text: "性別",
          value: "sex",
          requiredIcon: false,
          visible: true,
          disabledEdit: false
        },
        {
          text: "照片",
          value: "avatarPath",
          requiredIcon: false,
          visible: true,
          disabledEdit: false
        },
        {
          text: "生日",
          value: "birthday",
          visible: true,
          requiredIcon: false,
          disabledEdit: false
        },

        {
          text: "電話",
          value: "tel",
          visible: true,
          requiredIcon: false,
          disabledEdit: false
        },
        {
          text: "國別",
          value: "nation",
          visible: true,
          requiredIcon: true,
          disabledEdit: false
        },
        {
          text: "地址",
          value: "address",
          visible: true,
          requiredIcon: false,
          disabledEdit: false
        },

        {
          text: "狀態",
          value: "isActive",
          visible: true,
          requiredIcon: false,
          disabledEdit: false
        },

        {
          text: "公司名稱",
          value: "isCompany",
          requiredIcon: false,
          visible: true,
          disabledEdit: true
        },
        {
          text: "資料建立時間",
          value: "createdAt",
          visible: true,
          disabledEdit: true
        },
        {
          text: "資料更新時間",
          value: "updatedAt",
          visible: true,
          disabledEdit: true
        }
      ],
      // 編輯的欄位, 因為vue要綁定資料
      editedItem: {
        id: "",
        email: "",
        name: "",
        sex: "",
        avatarPath: "",
        birthday: "",
        tel: "",
        nation: "",
        address: "",
        isActive: "",
        isCompany: ""
      }
    };
  },
  mounted() {
    if (this.enableEdditItem || this.enableDeleteItem) {
      // 決定是否要再table上面有修改選項
      this.tableHeader.push({
        text: "修改",
        value: "action",
        sortable: false,
        visible: false,
        editable: false
      });
    }
  }
};
</script>
