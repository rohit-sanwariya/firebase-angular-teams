export interface MessageResponseItemModel {
  date: DateModel;
  senderId: string;
  text: string;
  id: string;

}
export interface MessageItemModel {
  date: Date;
  senderId: string;
  text: string;
  id: string;
  self:boolean

}
export interface DateModel {
  seconds: number;
  nanoseconds: number;
}
