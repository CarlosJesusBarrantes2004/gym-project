export const Form = ({ form, onSubmit, children, style = "" }) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={style}>
      {children}
    </form>
  );
};
