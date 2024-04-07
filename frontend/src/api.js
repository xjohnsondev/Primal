import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */
class PrimalApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PrimalApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get data for specific exercise */
  static async getExercise(id){
    let res = await this.request(`exercises/${id}`);
    return res.exercise;
  }

  /** Get all exercises. */
  static async getAll(){
    let res = await this.request(`exercises/all`);
    return res.exercises;
  }

  /** Get all exercise targets */
  static async getTargets(){
    let res = await this.request(`exercises`);
    return res;
  }

  /** Get all exercises for a target */
  static async getTargetExercises(target){
    let res = await this.request(`exercises/target/${target}`);
    return res;
  }

  /** Refresh app data (calls API) */
  static async refreshData(){
    let res = await this.request(`exercises/data/refresh`, {}, "post");
    return res;
  }

  /** Adds exercise to favorites table */
  static async handleFavorite(userId, exerciseId) {
    let res = await this.request(`exercises/favorite`, { userId, exerciseId }, "post");
    return res;
  }

  /** Fetches all exercises user has favorited */
  static async getUserFavorites(userId){
  let res = await this.request(`exercises/user-favorite`, {userId} , "post");
  return res.userFavorites;
  }
}

export default PrimalApi;
