type Props = {
  label: string;
}

export const CustomButton = ({ label }: Props) => {
  return (
    <button type="submit">{label}</button>
  );
}