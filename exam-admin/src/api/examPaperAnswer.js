import { post } from '@/utils/request'

export default {
  read: id => post('/api/admin/exampaper/read/' + id),
  edit: form => post('/api/admin/exampaper/edit', form)
}
