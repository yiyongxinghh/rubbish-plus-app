// 提示
export const showToast = (title: string, isSuccess: boolean) => {
    uni.showToast({
      title,
      icon: isSuccess ? "success" : "error",
    });
  };
  