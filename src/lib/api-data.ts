export const LIVE_API = "https://obtuse-labs-home.thresher-pirate.ts.net"

export const HERO_BODY = `POST /api/v1/payments/record
Authorization: Bearer <jwt>
Idempotency-Key: 8f14e45f-ceea-4b2a-9c1e-2b6a1d9f7a02

{
	"invoice_id": "inv_9f3a2c81",
	"amount": "499.00",
	"currency": "INR",
	"status": "success",
	"provider_reference": "razorpay_pay_Nk3xQ2"
}`

export const STACK = ['FastAPI','Python 3.14','SQLAlchemy 2.x','PostgreSQL 18','Redis','Celery + Beat','Pydantic v2','Docker Compose'];

export const PRIMITIVES = [
    {num:'01',name:'Plans',desc:'Price, currency and billing cycle that a subscription snapshots from.'},
    {num:'02',name:'Customers',desc:'The people and organisations being billed.'},
    {num:'03',name:'Subscriptions',desc:'Links a customer to a plan; moves through active, paused, cancelled, expired.'},
    {num:'04',name:'Invoices',desc:'Subscription or one-time — a discriminated union enforced at the DB level.'},
    {num:'05',name:'Payments',desc:'Recorded attempts against an invoice, made idempotent by a UNIQUE key.'},
    {num:'06',name:'Ledger',desc:'The append-only record of every money-flow event, insert-only.'}
];

export const LEDGER_BODY = `GET /api/v1/ledger?invoice_id=inv_9f3a2c81

[
    { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" },
    { "entry_type": "payment_success", "amount": "499.00", "currency": "INR" },
    { "entry_type": "payment_failure", "amount": "499.00", "currency": "INR" }
]`;

export const QUICKSTART_BODY = `git clone https://github.com/utkarsh-vats/subledger_backend.git && cd subledger_backend
cp .env.example .env.local
docker compose --env-file .env.local up -d\t\t# api · postgres 18 · redis · celery
docker compose exec web alembic upgrade head
# open http://localhost:8001/docs\t\t\t\t# interactive OpenAPI schema`;

export const github = "https://github.com/utkarsh-vats/subledger_backend";

const QUICKSTART_BODY_ALT = 'git clone https://github.com/utkarsh-vats/subledger_backend.git && cd subledger_backend\ncp .env.example .env.local\ndocker compose --env-file .env.local up -d      # api · postgres 18 · redis · celery\ndocker compose exec web alembic upgrade head\n# open http://localhost:8001/docs                # interactive OpenAPI schema';

const LEDGER_BODY_ALT = 'GET /api/v1/ledger?invoice_id=inv_9f3a2c81\n\n[\n  { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" },\n  { "entry_type": "payment_success", "amount": "499.00", "currency": "INR" },\n  { "entry_type": "payment_failure", "amount": "499.00", "currency": "INR" }\n]';

const HERO_BODY_ALT = "POST /api/v1/payments/record\nAuthorization: Bearer <jwt>\nIdempotency-Key: 8f14e45f-ceea-4b2a-9c1e-2b6a1d9f7a02\n\n{\n\t\"invoice_id\": \"inv_9f3a2c81\",\n\t\"amount\": \"499.00\",\n\t\"currency\": \"INR\",\n\t\"status\": \"success\",\n\t\"provider_reference\": \"razorpay_pay_Nk3xQ2\"\n}";

const AUTH_HDR = 'Authorization: Bearer <jwt>\n';

const LEDGER_ENTRY_BODY = '{\n  "id": "led_2c81f9a3",\n  "entry_type": "payment_success",\n  "customer_id": "cus_8f2a91d0",\n  "invoice_id": "inv_9f3a2c81",\n  "amount": "499.00",\n  "currency": "INR",\n  "created_at": "2026-08-06T02:00:00Z"\n}';

export const RESOURCES_BASE = [
    {id:'auth',name:'Auth',desc:'Obtain a JWT bearer token to authenticate every mutating request.',
        endpoints:[
        {method:'POST',path:'/api/v1/auth/login',desc:'Form-encoded username + password. Returns an access token.',
            body:'POST /api/v1/auth/login\nContent-Type: application/x-www-form-urlencoded\n\nusername=founder@obtuse.in&password=********\n\n→ 200\n{\n  "access_token": "eyJhbGciOiJIUzI1NiIs...",\n  "token_type": "bearer"\n}'}
        ]
    },
    {id:'plans',name:'Plans',desc:'Billing plans customers subscribe to — price, currency, cycle.',
        endpoints:[
        {method:'POST',path:'/api/v1/plans',desc:'Create a plan.',
            body:'POST /api/v1/plans\n'+AUTH_HDR+'{\n  "name": "Pro Monthly",\n  "billing_cycle": "monthly",\n  "price": "499.00",\n  "currency": "INR",\n  "status": "active"\n}\n\n→ 201\n{\n  "id": "plan_7a21",\n  "name": "Pro Monthly",\n  "billing_cycle": "monthly",\n  "price": "499.00",\n  "currency": "INR",\n  "status": "active"\n}'},
        {method:'GET',path:'/api/v1/plans',desc:'List plans. Filter by ?status=',
            body:'GET /api/v1/plans?status=active\n\n→ 200\n[\n  { "id": "plan_7a21", "name": "Pro Monthly", "price": "499.00", "currency": "INR", "status": "active" }\n]'},
        {method:'GET',path:'/api/v1/plans/{id}',desc:'Fetch a single plan.',
            body:'GET /api/v1/plans/plan_7a21\n\n→ 200\n{\n  "id": "plan_7a21",\n  "name": "Pro Monthly",\n  "billing_cycle": "monthly",\n  "price": "499.00",\n  "currency": "INR",\n  "status": "active"\n}'},
        {method:'PATCH',path:'/api/v1/plans/{id}',desc:'Update a plan.',
            body:'PATCH /api/v1/plans/plan_7a21\n'+AUTH_HDR+'{\n  "status": "archived"\n}\n\n→ 200\n{\n  "id": "plan_7a21",\n  "status": "archived"\n}'}
        ]
    },
    {id:'customers',name:'Customers',desc:'The people and organisations being billed.',
        endpoints:[
        {method:'POST',path:'/api/v1/customers',desc:'Create a customer.',
            body:'POST /api/v1/customers\n'+AUTH_HDR+'{\n  "name": "Aarav Shah",\n  "email": "aarav@example.com"\n}\n\n→ 201\n{\n  "id": "cus_8f2a91d0",\n  "name": "Aarav Shah",\n  "email": "aarav@example.com"\n}'},
        {method:'GET',path:'/api/v1/customers',desc:'List customers.',
            body:'GET /api/v1/customers\n\n→ 200\n[\n  { "id": "cus_8f2a91d0", "name": "Aarav Shah", "email": "aarav@example.com" }\n]'},
        {method:'GET',path:'/api/v1/customers/{id}',desc:'Fetch a customer.',
            body:'GET /api/v1/customers/cus_8f2a91d0\n\n→ 200\n{\n  "id": "cus_8f2a91d0",\n  "name": "Aarav Shah",\n  "email": "aarav@example.com"\n}'},
        {method:'PATCH',path:'/api/v1/customers/{id}',desc:'Update a customer.',
            body:'PATCH /api/v1/customers/cus_8f2a91d0\n'+AUTH_HDR+'{\n  "email": "aarav.shah@example.com"\n}\n\n→ 200\n{\n  "id": "cus_8f2a91d0",\n  "email": "aarav.shah@example.com"\n}'},
        {method:'GET',path:'/api/v1/customers/{id}/ledger',desc:'Ledger entries for this customer.',
            body:'GET /api/v1/customers/cus_8f2a91d0/ledger\n\n→ 200\n[\n  { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" },\n  { "entry_type": "payment_success", "amount": "499.00", "currency": "INR" }\n]'}
        ]
    },
    {id:'subscriptions',name:'Subscriptions',desc:'Links a customer to a plan and tracks lifecycle state.',
        endpoints:[
        {method:'POST',path:'/api/v1/subscriptions',desc:'Create a subscription.',
            body:'POST /api/v1/subscriptions\n'+AUTH_HDR+'{\n  "customer_id": "cus_8f2a91d0",\n  "plan_id": "plan_7a21"\n}\n\n→ 201\n{\n  "id": "sub_b1f2c3d4",\n  "customer_id": "cus_8f2a91d0",\n  "plan_id": "plan_7a21",\n  "status": "active"\n}'},
        {method:'GET',path:'/api/v1/subscriptions',desc:'List subscriptions. Filter by ?status=',
            body:'GET /api/v1/subscriptions?status=active\n\n→ 200\n[\n  { "id": "sub_b1f2c3d4", "status": "active" }\n]'},
        {method:'GET',path:'/api/v1/subscriptions/{id}',desc:'Fetch a subscription.',
            body:'GET /api/v1/subscriptions/sub_b1f2c3d4\n\n→ 200\n{\n  "id": "sub_b1f2c3d4",\n  "customer_id": "cus_8f2a91d0",\n  "plan_id": "plan_7a21",\n  "status": "active"\n}'},
        {method:'POST',path:'/api/v1/subscriptions/{id}/pause',desc:'Pause an active subscription.',
            body:'POST /api/v1/subscriptions/sub_b1f2c3d4/pause\n'+AUTH_HDR+'\n→ 200\n{\n  "id": "sub_b1f2c3d4",\n  "status": "paused"\n}'},
        {method:'POST',path:'/api/v1/subscriptions/{id}/resume',desc:'Resume a paused subscription.',
            body:'POST /api/v1/subscriptions/sub_b1f2c3d4/resume\n'+AUTH_HDR+'\n→ 200\n{\n  "id": "sub_b1f2c3d4",\n  "status": "active"\n}'},
        {method:'POST',path:'/api/v1/subscriptions/{id}/cancel',desc:'Cancel a subscription (terminal).',
            body:'POST /api/v1/subscriptions/sub_b1f2c3d4/cancel\n'+AUTH_HDR+'\n→ 200\n{\n  "id": "sub_b1f2c3d4",\n  "status": "cancelled"\n}'}
        ]
    },
    {id:'invoices',name:'Invoices',desc:'Subscription and one-time invoices — a discriminated union enforced by a DB check constraint.',
        endpoints:[
        {method:'POST',path:'/api/v1/invoices',desc:'Create a one-time invoice. Requires description.',
            body:'POST /api/v1/invoices\n'+AUTH_HDR+'{\n  "customer_id": "cus_8f2a91d0",\n  "invoice_type": "one_time",\n  "description": "Setup fee",\n  "amount": "150.00",\n  "currency": "INR"\n}\n\n→ 201\n{\n  "id": "inv_4c7e1a90",\n  "invoice_type": "one_time",\n  "description": "Setup fee",\n  "amount": "150.00",\n  "currency": "INR",\n  "status": "open"\n}'},
        {method:'POST',path:'/api/v1/invoices/generate',desc:"Generate a subscription invoice from the plan's snapshotted price.",
            body: 'POST /api/v1/invoices/generate\n'+AUTH_HDR+'{\n  "subscription_id": "sub_b1f2c3d4"\n}\n\n→ 201\n{\n  "id": "inv_9f3a2c81",\n  "invoice_type": "subscription",\n  "subscription_id": "sub_b1f2c3d4",\n  "amount": "499.00",\n  "currency": "INR",\n  "status": "open"\n}'},
        {method:'GET',path:'/api/v1/invoices',desc:'List invoices. Filter by status, invoice_type, customer_id, subscription_id, period_start.',
            body:'GET /api/v1/invoices?status=open\n\n→ 200\n[\n  { "id": "inv_9f3a2c81", "amount": "499.00", "currency": "INR", "status": "open" }\n]'},
        {method:'GET',path:'/api/v1/invoices/{id}',desc:'Fetch an invoice.',
            body:'GET /api/v1/invoices/inv_9f3a2c81\n\n→ 200\n{\n  "id": "inv_9f3a2c81",\n  "invoice_type": "subscription",\n  "amount": "499.00",\n  "currency": "INR",\n  "status": "open"\n}'},
        {method:'GET',path:'/api/v1/invoices/{id}/ledger',desc:'Ledger entries for this invoice.',
            body:'GET /api/v1/invoices/inv_9f3a2c81/ledger\n\n→ 200\n[\n  { "entry_type": "invoice_created", "amount": "499.00", "currency": "INR" }\n]'}
        ]
    },
    {id:'payments',name:'Payments',desc:'Recorded payment attempts against an invoice — idempotent by design.',
        endpoints:[
        {method:'POST',path:'/api/v1/payments/record',desc:'Record a payment attempt. Requires an Idempotency-Key header.',
            body: HERO_BODY+'\n\n→ 201\n{\n  "id": "pay_3d5f9a10",\n  "invoice_id": "inv_9f3a2c81",\n  "status": "success"\n}'},
        {method:'GET',path:'/api/v1/payments',desc:'List payments. Filter by ?invoice_id= or ?status=',
            body:'GET /api/v1/payments?invoice_id=inv_9f3a2c81\n\n→ 200\n[\n  { "id": "pay_3d5f9a10", "status": "success", "amount": "499.00", "currency": "INR" }\n]'},
        {method:'GET',path:'/api/v1/payments/{id}',desc:'Fetch a payment.',
            body:'GET /api/v1/payments/pay_3d5f9a10\n\n→ 200\n{\n  "id": "pay_3d5f9a10",\n  "invoice_id": "inv_9f3a2c81",\n  "amount": "499.00",\n  "currency": "INR",\n  "status": "success",\n  "provider_reference": "razorpay_pay_Nk3xQ2"\n}'}
        ]
    },
    {id:'ledger',name:'Ledger',desc:'The append-only record of every money-flow event.',
        endpoints:[
        {method:'GET',path:'/api/v1/ledger',desc:'Global ledger. Filter by customer_id, invoice_id, entry_type.',
            body:'GET /api/v1/ledger?entry_type=payment_success\n\n→ 200\n[\n  { "id": "led_2c81f9a3", "entry_type": "payment_success", "amount": "499.00", "currency": "INR" }\n]'},
        {method:'GET',path:'/api/v1/ledger/{id}',desc:'Fetch a single ledger entry.',
            body:'GET /api/v1/ledger/led_2c81f9a3\n\n→ 200\n'+ LEDGER_ENTRY_BODY}
        ]
    },
];