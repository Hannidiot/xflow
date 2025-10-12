import { addDialog, closeAllDialog } from "@/components/ReDialog";
import { useUserStoreHook } from "@/store/modules/user";
import { ref } from "vue";
import { $t } from "@/plugins/i18n";

const onCloseDialog = () => {
  loginExpiredDialogShown.value = false;
  useUserStoreHook().logOut();
  closeAllDialog();
};

export const loginExpiredDialogShown = ref(false);
export const showLoginExpiredDialog = () => {
  if (loginExpiredDialogShown.value) return;

  loginExpiredDialogShown.value = true;
  addDialog({
    title: $t("login.expiredTitle"),
    width: "40%",
    closeOnPressEscape: false,
    closeOnClickModal: false,
    hideFooter: true,
    contentRenderer: () => (
      <>
        <el-result title={$t("login.expiredMessage")} icon="error">
          {{
            extra: () => (
              <>
                <el-button type="primary" onClick={() => onCloseDialog()}>
                  {$t("buttons.pureConfirm")}
                </el-button>
              </>
            )
          }}
        </el-result>
      </>
    )
  });
};
