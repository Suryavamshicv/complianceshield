
import { InventoryItem, UserFeedback, User } from '../types';

const STORAGE_KEYS = {
  INVENTORY: 'cs_session_inventory',
  USER: 'cs_session_active_user',
  FEEDBACK: 'cs_session_feedback'
};

export const dbService = {
  async loginWithPhone(phone: string): Promise<User> {
    // In a real production app, this would verify the phone via backend
    const user: User = {
      id: `u_${btoa(phone).slice(0, 8)}`,
      name: `User ${phone.slice(-4)}`,
      phone: phone
    };
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  async saveItem(userId: string, item: InventoryItem): Promise<void> {
    const key = `${STORAGE_KEYS.INVENTORY}_${userId}`;
    const existing = this.getInventorySync(userId);
    const updated = [item, ...existing.filter(i => i.id !== item.id)];
    sessionStorage.setItem(key, JSON.stringify(updated));
  },

  getInventorySync(userId: string): InventoryItem[] {
    const key = `${STORAGE_KEYS.INVENTORY}_${userId}`;
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  async getInventory(userId: string): Promise<InventoryItem[]> {
    return this.getInventorySync(userId);
  },

  async deleteItem(userId: string, itemId: string): Promise<void> {
    const key = `${STORAGE_KEYS.INVENTORY}_${userId}`;
    const existing = this.getInventorySync(userId);
    const updated = existing.filter(i => i.id !== itemId);
    sessionStorage.setItem(key, JSON.stringify(updated));
  },

  async submitFeedback(userId: string, feedback: UserFeedback): Promise<void> {
    const data = sessionStorage.getItem(STORAGE_KEYS.FEEDBACK);
    const feedbacks = data ? JSON.parse(data) : [];
    feedbacks.push({ ...feedback, userId });
    sessionStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbacks));
  }
};
