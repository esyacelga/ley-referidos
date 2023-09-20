export class SessionData {
  public token;
  public userId;
  public groupId;

  constructor(token: string, userId: string, groupId: string) {
    this.token = token;
    this.userId = userId;
    this.groupId = groupId;
  }
}
