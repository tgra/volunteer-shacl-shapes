# Volunteer Shapes (SHACL)

[volunteer-shapes](./volunteer-shapes.ttl) is a SHACL vocabulary for modelling volunteering-related data. It defines shapes for **Activities**, **Roles**, **Organisations**, **Sessions**, **Locations**, and **Time**, along with their associated properties, to support consistent, validated RDF data about volunteering opportunities.

It is derived from [https://api.volunteeringdata.io/schema.ttl](Volunteering SKOS vocabulary) that describes volunteering activities, volunteer-involving organisations and volunteering management systems.

---

## **Namespaces**

| Prefix              | Namespace                                    |
| ------------------- | -------------------------------------------- |
| `volunteer-shapes:` | `https://solidproject.org/shapes/volunteer#` |
| `sh:`               | `http://www.w3.org/ns/shacl#`                |
| `rdfs:`             | `http://www.w3.org/2000/01/rdf-schema#`      |
| `skos:`             | `http://www.w3.org/2004/02/skos/core#`       |
| `vs:`               | `http://www.w3.org/2006/VS/terms/`           |
| `dc:`               | `http://purl.org/dc/terms/`                  |
| `prov:`             | `http://www.w3.org/ns/prov#`                 |
| `xsd:`              | `http://www.w3.org/2001/XMLSchema#`          |

---

## **1. Node Shapes**

### **LocationShape**

* **Description:** Represents any location related to volunteering activities.
* **Target Class:** `<https://ns.volunteeringdata.io/Location>`
* **Properties:**

  * `SessionHasLocation`

### **OrganisationShape**

* **Description:** Represents organisations running volunteer activities.
* **Target Class:** `<https://ns.volunteeringdata.io/Organisation>`
* **Properties:**

  * `OrganisationHasCharitableCause`
  * `OrganisationHasActivity`

### **RoleShape**

* **Description:** Represents any role related to a volunteering activity.
* **Target Class:** `<https://ns.volunteeringdata.io/Role>`
* **Properties:**

  * `RoleHasRequirement`
  * `RoleHasActivity`
  * `RoleAllowsRemoteParticipation`
  * `RoleHasReward`
  * `RoleHasSkill`
  * `RoleHasAccessibility`

### **ActivityShape**

* **Description:** Represents volunteer activities.
* **Target Class:** `<https://ns.volunteeringdata.io/Activity>`
* **Properties:**

  * `ActivityHasSession`
  * `ActivityRequiresEmergencyParticipation`
  * `ActivityHasOrganisation`
  * `ActivityHasRole`

### **WeekdayTimePeriodShape**

* **Description:** A predefined time period within a specific day of the week (morning, afternoon, evening).
* **Target Class:** `<https://ns.volunteeringdata.io/WeekdayTimePeriod>`

### **TimeShape**

* **Description:** Time information related to volunteering activities modeled as OWL time entities.
* **Target Class:** `<https://ns.volunteeringdata.io/Time>`
* **Properties:**

  * `TimeHasSession`

### **SessionShape**

* **Description:** Describes a time and place for an activity involving volunteers.
* **Target Class:** `<https://ns.volunteeringdata.io/Session>`
* **Properties:**

  * `SessionHasLocation`
  * `SessionHasActivity`
  * `SessionHasTime`

---

## **2. Property Shapes**

Property shapes define attributes and relationships between nodes. Examples include:

| Property Shape                           | Path                                     | Node Kind      | Class    | Datatype    | Description                        |
| ---------------------------------------- | ---------------------------------------- | -------------- | -------- | ----------- | ---------------------------------- |
| `AccessibilityInformationHasRole`        | `accessibilityRole`                      | BlankNodeOrIRI | Role     | –           | Accessibility info for a role      |
| `RewardHasRole`                          | `rewardRole`                             | BlankNodeOrIRI | Role     | –           | Reward linked to a role            |
| `ActivityRequiresEmergencyParticipation` | `activityRequiresEmergencyParticipation` | Literal        | –        | xsd:boolean | Flags emergency participation      |
| `HasCommitment`                          | `commitment`                             | Literal        | –        | –           | Free text describing commitment    |
| `HasGeometry`                            | `geometry`                               | Literal        | –        | –           | Spatial extent (OGC GeoSPARQL)     |
| `RoleHasTitle`                           | `roleTitle`                              | Literal        | –        | –           | Role title                         |
| `RoleAllowsRemoteParticipation`          | `roleAllowsRemoteParticipation`          | Literal        | –        | xsd:boolean | Remote participation allowed       |
| `RoleHasSkill`                           | `roleSkill`                              | BlankNodeOrIRI | Skill    | –           | Skills for the role                |
| `OrganisationHasActivity`                | `organisationActivity`                   | BlankNodeOrIRI | Activity | –           | Activities run by the organisation |
| `ActivityHasSession`                     | `activitySession`                        | BlankNodeOrIRI | Session  | –           | Sessions linked to an activity     |
| `SessionHasTime`                         | `sessionTime`                            | BlankNodeOrIRI | Time     | –           | Time info for a session            |

> The vocabulary includes **dozens of property shapes** for roles, activities, organisations, sessions, locations, skills, rewards, accessibility, and time.

---

## **3. Relationships**

The shapes define the following main relationships:

* **Roles** link to **Skills**, **Accessibility**, **Rewards**, **Requirements**, and **Activities**.
* **Activities** link to **Organisations**, **Roles**, and **Sessions**.
* **Sessions** link to **Locations**, **Activities**, and **Time**.
* **Locations** support spatial data (latitude, longitude, geometry) and addresses.
* **Organisations** can have multiple activities and charitable causes.
* **Time** entities model temporal information for sessions.

---

## **4. Usage**

This SHACL vocabulary can be used to:

1. **Validate RDF data** about volunteering opportunities.
2. **Ensure consistency** of volunteer-related datasets.
3. **Model complex relationships** between activities, roles, sessions, locations, organisations, and time.

**Example SPARQL queries** could include:

* Fetch all activities requiring emergency participation.
* List all roles allowing remote participation.
* Find all sessions at a given location.

---

## **5. Metadata**

* **Created:** 2026-03-23
* **Source:** `<https://api.volunteeringdata.io/schema.ttl>`
* **Status:** Testing
* **Provenance:** Derived from Volunteering Data API


