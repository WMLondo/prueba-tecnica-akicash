1. Monto total desembolsado (solicitudes 'approved') por cliente en un rango de fechas dado.

```ts
this.knex("client as c")
  .join("load_application as la", ";a.client_id", "c.id")
  .where("la.status", "approved")
  .whereBetween("la.created_at", [startDate, endDate])
  .groupBy("c.id", "c.full_name", "c.dni")
  .select(
    "c.id as clientId",
    "c.full_name as fullName",
    "c.dni",
    this.knex.raw("SUM(la.requested_amount) as totalDisbursed"),
  )
  .orderBy("totalDisbursed", "desc");
```

2. Los 5 clientes con mayor monto aprobado en lo que va del año (JOIN + GROUP BY + ORDER BY + LIMIT).

```ts
this.knex("client as c")
  .join("load_application as la", "la.client_id", "c.id")
  .where("la.status", "approved")
  .whereRaw("YEAR(la.created_at) = YEAR(CURDATE())")
  .groupBy("c.id", "c.full_name", "c.dni")
  .select(
    "c.id as clientId",
    "c.full_name as fullName",
    "c.dni",
    this.knex.raw("SUM(la.requested_amount) as totalApproved"),
  )
  .orderBy("totalApproved", "desc")
  .limit(5);
```

3. Una consulta que muestre las cuotas (installments) vencidas y no pagadas (due_date en el pasado, paid = false) — y una breve nota de qué índice(s) agregarías para que esa consulta escale bien con muchos registros.

```ts
this.knex("installment as i")
  .join("loan_application as la", "la.id", "i.loan_application_id")
  .join("client as c", "c.id", "la.client_id")
  .where("i.due_date", "<", this.knex.fn.now())
  .where('i.paid', false)
  .select(
    'i.id',
    'i.loan_application_id as loadApplicationId',
    'i.due_date as dueDate',
    'i.amount',
    'i.paid',
    'la.client_id as clientId',
    'c.full_name as fullName'
    'c.dni'
  )
  .orderBy('i.due_date', 'asc');
```

**Indices que agregaria**:

```sql
CREATE INDEX idx_installment_due_paid
  ON installment (due_date, paid);
```

```sql
CREATE INDEX idx_installment_loan_app
  ON installment (loan_application_id);
```
