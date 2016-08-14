/* global window */
import '../html/css/login.css'
import '../node_modules/toastr/build/toastr.css'
import { mapGetters } from 'vuex'
import ls from 'store2'
import ajaxForm from './components/app/ajax-form'
export default {
    computed: {
        ...mapGetters({
            global: 'getGlobal'
        })
    },
    components: {
        ajaxForm
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
                remember_me: ''
            }
        }
    },
    methods: {
        handleChange(type, e) {
            this.form[type] = e.target.value
        },
        onFormComplete(res) {
            if (res.code === 200) {
                this.$store.dispatch('showMsg', '登录成功', 'success')
                ls.set("token", res.data)
                setTimeout(() => {
                    window.location.href = "/post"
                }, 1000)
            } else {
                this.$store.dispatch('showMsg', res.message)
            }
        }
    },
    render(h) { // eslint-disable-line
        return (
            <section class="container">
                <div class="login">
                    <h1>后台管理</h1>
                    <ajax-form id="shake-setting" action="/api/?action=login" method="post" onFormComplete={this.onFormComplete}>
                        <p><input on-keyup={this.handleChange.bind(this, 'username')} type="text" name="username" value="" placeholder="请输入用户名" /></p>
                        <p><input on-keyup={this.handleChange.bind(this, 'password')} type="password" name="password" value="" placeholder="请输入密码" /></p>
                        <p class="remember_me">
                            <label>
                                <input on-change={this.handleChange.bind(this, 'remember_me')} value="on" type="checkbox" name="remember_me" id="remember_me" />
                                保持登录
                            </label>
                        </p>
                        <p class="submit"><input type="submit" value="登录" disabled={this.form.usrname !== '' && this.form.password !== '' ? null: 'true'} /></p>
                    </ajax-form>
                </div>
            </section>
        )
    }
}